import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import "../styles/SeriesSafety.css";
import { FormulaCarSeriesKeywords, SportsCarSeriesKeywords, OvalSeriesKeywords, DirtRoadSeriesKeywords, DirtOvalSeriesKeywords } from "../utils/seriesKeywords";

const SeriesSafety = () => {
        const [data, setData] = useState([]);
        const [historicData, setHistoricData] = useState([]);
        const [filteredData, setFilteredData] = useState([]);
        const [filteredHistoricData, setFilteredHistoricData] = useState([]);
        const [isError, setError] = useState(false);
        const [page, setPage] = useState(0);
        const [isLoading, setIsLoading] = useState(true);
        const [isMobile, setIsMobile] = useState(window.innerWidth <= 760);
        const [pageSize, setPageSize] = useState(isMobile ? 4 : 9);
        const [dataType, setDataType] = useState("all");
        const [minTotalEntrants, setMinTotalEntrants] = useState(100);
        const [showCurrentWeek, setShowCurrentWeek] = useState(false);
        const [showCurrentSeason, setShowCurrentSeason] = useState(false);

        // Helper function goes here
        const capitalizeFirstLetter = (string) => {
                return string.charAt(0).toUpperCase() + string.slice(1);
        };

        useEffect(() => {
                const fetchData = async () => {
                        try {
                                const response = await fetch("https://iracing6-backend.herokuapp.com/api/series-safety/");
                                const data = await response.json();
                                data.sort((a, b) => b.totalCorners / b.totalIncidents - a.totalCorners / a.totalIncidents);
                                setData(data);
                                setIsLoading(false);
                        } catch (error) {
                                setError(true);
                        }
                };

                fetchData();
        }, []);

        useEffect(() => {
                const fetchHistoricData = async () => {
                        try {
                                const response = await fetch("https://iracing6-backend.herokuapp.com/api/series-safety/historic/");
                                const data = await response.json();
                                data.sort((a, b) => b.totalCorners / b.totalIncidents - a.totalCorners / a.totalIncidents);
                                setHistoricData(data);
                                setIsLoading(false);
                        } catch (error) {
                                setError(true);
                        }
                };

                fetchHistoricData();
        }, []);

        useEffect(() => {
                let keywords = [];
                switch (dataType) {
                        case "sports car":
                                keywords = SportsCarSeriesKeywords;
                                break;
                        case "formula car":
                                keywords = FormulaCarSeriesKeywords;
                                break;
                        case "oval":
                                keywords = OvalSeriesKeywords;
                                break;
                        case "dirt road":
                                keywords = DirtRoadSeriesKeywords;
                                break;
                        case "dirt oval":
                                keywords = DirtOvalSeriesKeywords;
                                break;
                        case "all":
                                keywords = [...SportsCarSeriesKeywords, ...FormulaCarSeriesKeywords, ...OvalSeriesKeywords, ...DirtRoadSeriesKeywords, ...DirtOvalSeriesKeywords];
                                break;
                        default:
                                break;
                }

                const filtered = data.filter((item) => keywords.some((keyword) => item.season_name.includes(keyword)) && item.totalEntrants >= minTotalEntrants);
                setFilteredData(filtered);
                setPage(0); // Reset page number whenever dataType changes

                const filteredHistoric = historicData.filter((item) => keywords.some((keyword) => item.season_name.includes(keyword)) && item.totalEntrants >= minTotalEntrants);
                setFilteredHistoricData(filteredHistoric);
        }, [dataType, data, historicData, minTotalEntrants]);

        if (isLoading) {
                return <div>Loading...</div>;
        }

        if (isError) {
                return <div>Failed to load data.</div>;
        }

        // Calculate the total number of pages
        const pageCount = Math.ceil(filteredData.length / pageSize);

        // Calculate the data for the current page
        const currentData = filteredData.slice(page * pageSize, (page + 1) * pageSize);
        const currentHistoricData = filteredHistoricData.slice(page * pageSize, (page + 1) * pageSize);

        const changePage = (newPage) => {
                if (newPage >= 0 && newPage < pageCount) {
                        setPage(newPage);
                }
        };

        return (
                <div className="ss_main_div">
                        <div className="ss_entr-row">
                                <div className="ss_title_min">Min. Entrants: </div>
                                <input className="min-ss-ent" type="number" value={minTotalEntrants} onChange={(e) => setMinTotalEntrants(e.target.value)} placeholder="Minimum Total Entrants" />
                        </div>
                        <div className="data-type-buttons">
                                <button className="incpc-cat-button-le" onClick={() => setDataType("all")}>
                                        All
                                </button>
                                <button className="incpc-cat-button" onClick={() => setDataType("sports car")}>
                                        Sports Car
                                </button>
                                <button className="incpc-cat-button" onClick={() => setDataType("formula car")}>
                                        Formula Car
                                </button>
                                <button className="incpc-cat-button" onClick={() => setDataType("oval")}>
                                        Oval
                                </button>
                                <button className="incpc-cat-button" onClick={() => setDataType("dirt road")}>
                                        Dirt Road
                                </button>
                                <button className="incpc-cat-button-re" onClick={() => setDataType("dirt oval")}>
                                        Dirt Oval
                                </button>
                        </div>
                        <div className="smol-space-div"></div>
                        <div className="safety-time-title"> CURRENT WEEK</div>

                        <Plot
                                data={[
                                        {
                                                x: currentData.map(
                                                        (item) =>
                                                                `${item.season_name
                                                                        .replace("2024 Season 3", "")
                                                                        .replace(/-/g, "")
                                                                        .replace(/series/gi, "")
                                                                        .replace(/iRacing/gi, "")
                                                                        .replace(/Racing/gi, "")
                                                                        .replace(/Dallara/gi, "")
                                                                        .replace(/Pure Driving School/gi, "")
                                                                        .replace(/Fanatec Cup/gi, "")
                                                                        .replace(/  /gi, " ")
                                                                        .replace(/Fixed  Fixed/gi, "Fixed")
                                                                        .replace(/Maconi Setup Shop/gi, "Maconi")
                                                                        .replace(/Moza Racing/gi, "")}<br>(${item.totalEntrants})`
                                                ),
                                                y: currentData.map((item) => (item.totalCorners / item.totalIncidents).toFixed(2)),
                                                type: "bar",
                                                mode: "lines+markers",
                                                marker: {
                                                        color: "#154fa7",
                                                        line: {
                                                                color: "#3e8bff",
                                                                width: 1,
                                                        },
                                                },
                                        },
                                ]}
                                layout={{
                                        margin: isMobile ? { l: 40, r: 70, t: 90, b: 200 } : { l: 80, r: 100, t: 90, b: 200 },
                                        width: isMobile ? window.innerWidth : window.innerWidth - window.innerWidth * 0.3,
                                        height: 650,
                                        title: `Corners / Incident Point / Person: Week 2/13 (${capitalizeFirstLetter(dataType)})`,
                                        annotations: [
                                                {
                                                        text: "Higher is Safer",
                                                        font: {
                                                                size: isMobile ? 10 : 12, // adjust as needed
                                                                color: "#dddddd", // same color as title for consistency
                                                        },
                                                        showarrow: false,
                                                        align: "center",
                                                        x: 0.5, // center it based on x axis
                                                        y: 1.09, // position just below the title; you may need to adjust this based on your title's size and margin
                                                        xref: "paper",
                                                        yref: "paper",
                                                },
                                                {
                                                        text: "Series Name (Race Entries)", // Your custom x-axis title as an annotation
                                                        xref: "paper",
                                                        yref: "paper",
                                                        x: 0.5, // Centered horizontally
                                                        y: -0.49, // Adjust this value to move your custom title lower or higher
                                                        showarrow: false,
                                                        font: {
                                                                size: 12, // Adjust as necessary
                                                                color: "#dddddd", // Match your chart's color scheme
                                                        },
                                                },
                                        ],
                                        plot_bgcolor: "#29272b",
                                        paper_bgcolor: "#29272b",
                                        titlefont: {
                                                // This line is added
                                                size: isMobile ? 14 : 16, // Adjust the size as per your requirement
                                                color: "#dddddd", // You can also change the color and font-family
                                        },
                                        font: {
                                                color: "#dddddd",
                                                size: isMobile ? 8 : 11,
                                                family: "Questrial, sans-serif",
                                        },
                                        yaxis: {
                                                gridcolor: "darkgrey",
                                        },
                                        xaxis: {
                                                gridcolor: "darkgrey",
                                                // tickangle: 30,
                                                tickformat: function (d) {
                                                        return d.replace("<br>", "\n");
                                                },
                                        },
                                }}
                                config={isMobile ? { displayModeBar: false } : { displayModeBar: false }}
                        />
                        <button className="toggle-button-safety" onClick={() => setShowCurrentWeek(!showCurrentWeek)}>
                                {showCurrentWeek ? "Hide Current Week Table" : "Show Current Week Table"}
                        </button>
                        {showCurrentWeek && (
                                <div className="data-table-container-sp">
                                        <table className="data-table-sp">
                                                <thead>
                                                        <tr className="tr-sp-title">
                                                                <th>Series Name</th>
                                                                <th>Corners Raced</th>
                                                                <th>Total Incidents</th>
                                                                <th>Corners/Incident</th>
                                                        </tr>
                                                </thead>
                                                <tbody>
                                                        {filteredData.map((item, index) => (
                                                                <tr key={index} className="table-row-div1">
                                                                        <td>{item.season_name}</td>
                                                                        <td>{item.totalCorners}</td>
                                                                        <td>{item.totalIncidents}</td>
                                                                        <td>{(item.totalCorners / item.totalIncidents).toFixed(2)}</td>
                                                                </tr>
                                                        ))}
                                                </tbody>
                                        </table>
                                </div>
                        )}
                        <div className="chart-nav-buttons-sp-container">
                                <button style={{ visibility: page === 0 ? "hidden" : "visible" }} className="prev-button-sp" onClick={() => changePage(page - 1)} disabled={page === 0}>
                                        ← Previous
                                </button>
                                <button
                                        style={{
                                                visibility: (page + 1) * pageSize < filteredData.length ? "visible" : "hidden",
                                        }}
                                        className="next-button-sp"
                                        onClick={() => changePage(page + 1)}
                                        disabled={page === pageCount - 1}
                                >
                                        Next →
                                </button>
                        </div>
                        <div className="safety-time-title"> CURRENT SEASON</div>
                        <Plot
                                data={[
                                        {
                                                x: currentHistoricData.map(
                                                        (item) =>
                                                                `${item.season_name
                                                                        .replace("2024 Season 3", "")
                                                                        .replace(/-/g, "")
                                                                        .replace(/series/gi, "")
                                                                        .replace(/iRacing/gi, "")
                                                                        .replace(/Racing/gi, "")
                                                                        .replace(/Dallara/gi, "")
                                                                        .replace(/Pure Driving School/gi, "")
                                                                        .replace(/Fanatec Cup/gi, "")
                                                                        .replace(/  /gi, " ")
                                                                        .replace(/Fixed  Fixed/gi, "Fixed")
                                                                        .replace(/Maconi Setup Shop/gi, "Maconi")
                                                                        .replace(/Moza Racing/gi, "")}<br>(${item.totalEntrants})`
                                                ),
                                                y: currentHistoricData.map((item) => (item.totalCorners / item.totalIncidents).toFixed(2)),
                                                type: "bar",
                                                mode: "lines+markers",
                                                marker: {
                                                        color: "#154fa7",
                                                        line: {
                                                                color: "#3e8bff",
                                                                width: 1,
                                                        },
                                                },
                                        },
                                ]}
                                layout={{
                                        margin: isMobile ? { l: 40, r: 70, t: 90, b: 200 } : { l: 80, r: 100, t: 90, b: 200 },
                                        width: isMobile ? window.innerWidth : window.innerWidth - window.innerWidth * 0.3,
                                        height: 650,
                                        title: `Corners / Incident Point / Person: Whole Season (${capitalizeFirstLetter(dataType)})`,
                                        annotations: [
                                                {
                                                        text: "Higher is Safer",
                                                        font: {
                                                                size: isMobile ? 10 : 12, // adjust as needed
                                                                color: "#dddddd", // same color as title for consistency
                                                        },
                                                        showarrow: false,
                                                        align: "center",
                                                        x: 0.5, // center it based on x axis
                                                        y: 1.09, // position just below the title; you may need to adjust this based on your title's size and margin
                                                        xref: "paper",
                                                        yref: "paper",
                                                },
                                                {
                                                        text: "Series Name (Race Entries)", // Your custom x-axis title as an annotation
                                                        xref: "paper",
                                                        yref: "paper",
                                                        x: 0.5, // Centered horizontally
                                                        y: -0.49, // Adjust this value to move your custom title lower or higher
                                                        showarrow: false,
                                                        font: {
                                                                size: 12, // Adjust as necessary
                                                                color: "#dddddd", // Match your chart's color scheme
                                                        },
                                                },
                                        ],
                                        plot_bgcolor: "#29272b",
                                        paper_bgcolor: "#29272b",
                                        titlefont: {
                                                // This line is added
                                                size: isMobile ? 14 : 16, // Adjust the size as per your requirement
                                                color: "#dddddd", // You can also change the color and font-family
                                        },
                                        font: {
                                                color: "#dddddd",
                                                size: isMobile ? 8 : 11,
                                                family: "Questrial, sans-serif",
                                        },
                                        yaxis: {
                                                gridcolor: "darkgrey",
                                        },
                                        xaxis: {
                                                gridcolor: "darkgrey",
                                                // tickangle: 30,
                                                tickformat: function (d) {
                                                        return d.replace("<br>", "\n");
                                                },
                                        },
                                }}
                                config={isMobile ? { displayModeBar: false } : { displayModeBar: false }}
                        />
                        <button className="toggle-button-safety" onClick={() => setShowCurrentSeason(!showCurrentSeason)}>
                                {showCurrentSeason ? "Hide Current Season Table" : "Show Current Season Table"}
                        </button>
                        {showCurrentSeason && (
                                <div className="data-table-container-sp">
                                        <table className="data-table-sp">
                                                <thead>
                                                        <tr className="tr-sp-title">
                                                                <th>Series Name</th>
                                                                <th>Corners Raced</th>
                                                                <th>Total Incidents</th>
                                                                <th>Corners/Incident</th>
                                                        </tr>
                                                </thead>
                                                <tbody>
                                                        {filteredHistoricData.map((item, index) => (
                                                                <tr key={index} className="table-row-div1">
                                                                        <td>{item.season_name}</td>
                                                                        <td>{item.totalCorners}</td>
                                                                        <td>{item.totalIncidents}</td>
                                                                        <td>{(item.totalCorners / item.totalIncidents).toFixed(2)}</td>
                                                                </tr>
                                                        ))}
                                                </tbody>
                                        </table>
                                </div>
                        )}
                        <div className="chart-nav-buttons-sp-container">
                                <button style={{ visibility: page === 0 ? "hidden" : "visible" }} className="prev-button-sp" onClick={() => changePage(page - 1)} disabled={page === 0}>
                                        ← Previous
                                </button>
                                <button
                                        style={{
                                                visibility: (page + 1) * pageSize < filteredData.length ? "visible" : "hidden",
                                        }}
                                        className="next-button-sp"
                                        onClick={() => changePage(page + 1)}
                                        disabled={page === pageCount - 1}
                                >
                                        Next →
                                </button>
                        </div>
                        <div className="ss-disclaimer-text-div">
                                This chart contains data from all official race sessions. This data contains the number of corners driven by all drivers and their accumulated incident points,
                                displayed as corners per incident point.
                        </div>
                </div>
        );
};

export default SeriesSafety;
