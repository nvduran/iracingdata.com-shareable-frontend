import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Plot from "react-plotly.js";
import "../styles/SeriesLapTimeChart.css";
import { useNavigate } from "react-router-dom";
import { getIconFileName } from "../utils/iconUtils";
import { seriesList } from "../utils/seriesList";

function SeriesLapTimeChart() {
        const { season_name } = useParams();
        const [data, setData] = useState([]);
        const [loading, setLoading] = useState(true);
        const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
        const [searchTerm, setSearchTerm] = useState("");
        const [selectedCategory, setSelectedCategory] = useState("");
        const [tableVisibility, setTableVisibility] = useState({});

        const [filteredSeriesList, setFilteredSeriesList] = useState(seriesList);

        const categoryKeywords = {
                "formula car": ["Formula", "Skip Barber", "US Open Wheel", "Grand Prix Legends", "F4"],
                "sports car": [
                        "GT Thrustmaster Challenge",
                        "Ring Meister",
                        "LMP3",
                        "Clio",
                        "Sports Car Challenge",
                        "European Sprint",
                        "Kamel GT",
                        "Supercars",
                        "Touring Car",
                        "GT Challenge",
                        "Lotus",
                        "Mission R",
                        "Stock Car Brasil",
                        "Radical Racing Challenge",
                        "Ferrari",
                        "Global Fanatec",
                        "Mazda",
                        "Spec Racer Ford",
                        "Clio",
                        "LMP2",
                        "VRS Series",
                        "GR",
                        "Production Car Sim",
                        "Porsche Cup",
                        "GT3",
                        "GT4",
                        "GTE",
                        "IMSA",
                        "INDYCAR",
                        "GT Endurance",
                        "GT Sprint",
                        "CONSPIT",
                        "TCR",
                        "BMW M Power",
                        "Radical",
                        "SRX",
                        "Weekly Race Challenge",
                ],
                oval: [
                        "NASCAR",
                        "Truck",
                        "Xfinity",
                        "INDYCAR",
                        "ARCA",
                        "Super Late Model Series",
                        "Silver Crown",
                        "SK Modified",
                        "Tour Modified",
                        "Street Stock Fanatec",
                        "PickUp Cup",
                        "Legends Series",
                        "Carburetor Cup",
                        "Late Model Stock Tour",
                        "Advanced Legends Cup",
                        "Dallara Dash",
                        "Street Stock Next Level Racing Series",
                        "Big Block Modified",
                        "Draft Master",
                        "Gen 4 Cup",
                        "Rookie Legends VRS",
                ],
                "dirt road": ["iRX", "Rookie Pro", "Pro 4 Off", "Pro 2 Off", "Pro Lite", "Pro 2 Lite", "Pro 4 Lite", "Rallycross"],
                "dirt oval": ["Dirt Legends", "USAC", "World of Outlaws", "Sprint Car Cup", "Dirt Super Late", "Dirt 410", "Midget", "DIRTcar", "WoO", "Micro", "Legends Cup"],
                // Add other categories as needed
        };

        useEffect(() => {
                const checkMobile = () => setIsMobile(window.innerWidth <= 768);
                window.addEventListener("resize", checkMobile);
                return () => window.removeEventListener("resize", checkMobile);
        }, []);

        useEffect(() => {
                let filtered = seriesList;

                if (selectedCategory) {
                        filtered = filtered.filter((series) => categoryKeywords[selectedCategory].some((keyword) => series.includes(keyword)));
                }

                filtered = filtered.filter((series) => series.toLowerCase().includes(searchTerm.toLowerCase()));

                setFilteredSeriesList(filtered);
        }, [searchTerm, selectedCategory]);

        useEffect(() => {
                async function fetchData() {
                        try {
                                const response = await fetch(`https://iracing6-backend.herokuapp.com/api/series-avg-lap-times/average-lap-time/${season_name}`);
                                let jsonData = await response.json();

                                const lapTimes = jsonData.map((item) => item.best_lap_time_avg / 10000);
                                const Q1 = lapTimes.sort((a, b) => a - b)[Math.floor(lapTimes.length / 4)];
                                const Q3 = lapTimes.sort((a, b) => a - b)[Math.floor((3 * lapTimes.length) / 4)];
                                const IQR = Q3 - Q1;
                                const lowerBound = Q1 - 2 * IQR;
                                const upperBound = Q3 + 2 * IQR;

                                const filteredData = jsonData.filter((item) => {
                                        const lapTime = item.best_lap_time_avg / 10000;
                                        return lapTime >= lowerBound && lapTime <= upperBound;
                                });

                                const sortedData = filteredData.sort((a, b) => a.i_rating_range[0] - b.i_rating_range[0]);

                                setData(sortedData);
                                setLoading(false);

                                // Initialize table visibility state
                                const initialTableVisibility = {};
                                sortedData.forEach((item) => {
                                        const className = item.compositeKey.carClassName;
                                        if (!initialTableVisibility[className]) {
                                                initialTableVisibility[className] = false; // Minimized by default
                                        }
                                });
                                setTableVisibility(initialTableVisibility);
                        } catch (error) {
                                console.error("Error fetching data:", error);
                                setLoading(false);
                        }
                }

                fetchData();
        }, [season_name]);

        const navigate = useNavigate();

        const handleLinkToSeriesPop = () => {
                navigate("/charts/SeriesPopularity");
        };

        const getIconUrl = (seasonName) => {
                const iconName = getIconFileName(seasonName);
                return `${process.env.PUBLIC_URL}/assets/series-icons/${iconName}.png`;
        };

        const handleLinkToSpecificSeries = (seriesName) => {
                const index = seriesList.indexOf(seriesName);
                const encodedSeriesName = encodeURIComponent(seriesList[index]);
                navigate(`/charts/SeriesLapTimeChart/${encodedSeriesName}`);
        };

        const handleMulticlass = (seriesName) => {
                if (seriesName.includes("IMSA")) {
                        navigate("/charts/IMSA");
                } else if (seriesName.includes("Sports Car")) {
                        navigate("/charts/SCC");
                } else if (seriesName.includes("Production Car")) {
                        navigate("/charts/PCC");
                } else if (seriesName.includes("GT Sprint Series")) {
                        navigate("/charts/VRS");
                } else if (seriesName.includes("GT3 Fanatec Challenge")) {
                        navigate("/charts/FanatecFixed");
                }
        };

        const toggleTableVisibility = (className) => {
                setTableVisibility((prevState) => ({
                        ...prevState,
                        [className]: !prevState[className],
                }));
        };

        if (loading) {
                return <div className="spinner"></div>;
        }

        const groupedData = data.reduce((acc, item) => {
                const className = item.compositeKey.carClassName;
                if (!acc[className]) {
                        acc[className] = [];
                }
                acc[className].push(item);
                return acc;
        }, {});

        const plotData = (groupedData) => {
                return Object.keys(groupedData).map((className) => {
                        const classData = groupedData[className];
                        return {
                                x: classData.map((item) => item.i_rating_range.join("-")),
                                y: classData.map((item) => item.best_lap_time_avg / 10000),
                                type: "scatter",
                                mode: "lines+markers",
                                marker: { color: "#f1c40f" },
                                name: className,
                        };
                });
        };

        const layout = {
                font: {
                        family: "Questrial, sans-serif",
                        size: window.innerWidth < 800 ? 10 : 12,
                        color: "#dddddd",
                },
                margin: window.innerWidth > 800 ? { l: 40, r: 10, t: 90, b: 100 } : { l: 34, r: 6, t: 90, b: 100 },
                plot_bgcolor: "#29272b",
                paper_bgcolor: "#29272b",
                title: {
                        text: `${season_name} (Week 2/13)`,
                        font: { color: "rgba(200, 200, 200, 1)" },
                },
                xaxis: { title: "iRating", color: "rgba(200, 200, 200, 1)" },
                yaxis: {
                        title: "Avg Quali Time (seconds)",
                        color: "rgba(200, 200, 200, 1)",
                },
                hovermode: false,
                legend: {},
                width: window.innerWidth > 800 ? window.innerWidth - 100 : window.innerWidth - 20,
                height: window.innerWidth > 800 ? 600 : window.innerHeight - 200,
        };

        if (!season_name) {
                return (
                        <div>
                                <div className="slp-container">
                                        <div className="slp-title">Series Lap Times</div>
                                        <div className="slp-pop-cont" onClick={handleLinkToSeriesPop}>
                                                Select Series by Popularity Here 🡵
                                        </div>

                                        <div className="slp-or-div">Or, here are the series in alphabetical order:</div>
                                        <div className="chart-cat-buttons-sp-container">
                                                <button className="chart-cat-buttons-sp-div-le" onClick={() => setSelectedCategory("sports car")}>
                                                        Sports Car
                                                </button>
                                                <button className="chart-cat-buttons-sp-div" onClick={() => setSelectedCategory("formula car")}>
                                                        Formula Car
                                                </button>
                                                <button className="chart-cat-buttons-sp-div" onClick={() => setSelectedCategory("oval")}>
                                                        Oval
                                                </button>
                                                <button className="chart-cat-buttons-sp-div" onClick={() => setSelectedCategory("dirt road")}>
                                                        Dirt Road
                                                </button>
                                                <button className="chart-cat-buttons-sp-div-re" onClick={() => setSelectedCategory("dirt oval")}>
                                                        Dirt Oval
                                                </button>
                                        </div>
                                        <div className="search-bar-container-slt">
                                                <input type="text" className="search-bar" placeholder="Search series..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                                        </div>
                                        <div className="slp-series-squares-container">
                                                {filteredSeriesList.map((series, index) => (
                                                        <div key={index} className="slp-series-square" onClick={() => handleLinkToSpecificSeries(series)}>
                                                                <div className="slp-series-icon">
                                                                        <img
                                                                                src={getIconUrl(series)}
                                                                                style={{
                                                                                        marginRight: "0.3rem",
                                                                                        marginLeft: "0.3rem",
                                                                                        width: "2.8rem",
                                                                                        marginTop: "0rem",
                                                                                        marginBottom: "0rem",
                                                                                }}
                                                                        />
                                                                </div>
                                                                <div className="slp-series-name">{series}</div>
                                                        </div>
                                                ))}
                                        </div>
                                </div>
                        </div>
                );
        }

        if (season_name) {
                return (
                        <div>
                                <div className="slp-season-name">{season_name} (Week 2/13)</div>
                                {Object.keys(groupedData).map((className) => (
                                        <div key={className}>
                                                <Plot
                                                        data={plotData({ [className]: groupedData[className] })}
                                                        layout={{ ...layout, title: `${className}` }}
                                                        config={isMobile ? { displayModeBar: false } : {}}
                                                />
                                                <div className="table-toggle-button" onClick={() => toggleTableVisibility(className)}>
                                                        {tableVisibility[className] ? "Hide Table" : "Show Table"}
                                                </div>
                                                {tableVisibility[className] && (
                                                        <div className="data-table-container-sp">
                                                                <table className="data-table-sp">
                                                                        <thead>
                                                                                <tr className="tr-sp-title">
                                                                                        <th>iRating Range</th>
                                                                                        <th>Avg Quali Time (seconds)</th>
                                                                                </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                                {groupedData[className].map((item, index) => (
                                                                                        <tr key={index}>
                                                                                                <td>{item.i_rating_range.join("-")}</td>
                                                                                                <td>{(item.best_lap_time_avg / 10000).toFixed(4)}</td>
                                                                                        </tr>
                                                                                ))}
                                                                        </tbody>
                                                                </table>
                                                        </div>
                                                )}
                                        </div>
                                ))}
                        </div>
                );
        }
}

export default SeriesLapTimeChart;
