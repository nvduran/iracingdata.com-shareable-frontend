import React, { useEffect, useState } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import "../styles/SeriesPopularity.css";
import { getIconFileName } from "../utils/iconUtils";

function SeriesPopularity() {
        const [data, setData] = useState(null);
        const [strengthRange, setStrengthRange] = useState([0, 99999]);
        const [startTimesRange, setStartTimesRange] = useState([0, 24]);
        const [page, setPage] = useState(0);
        const itemsPerPage = window.innerWidth > 800 ? 16 : 8;
        const [filter, setFilter] = useState("all"); // 'road', 'oval', 'all'
        const [filteredData1, setFilteredData1] = useState([]);
        const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
        const [seasonTrackData, setSeasonTrackData] = useState([]);
        const [wetTrack, setWetTrack] = useState(false);

        const trimSeasonName = (originalSeasonName) => {
                // Add your trimming logic here (not working)

                // copy the others from below but in this format
                return originalSeasonName; // Default return if no condition matches
        };

        useEffect(() => {
                const checkMobile = () => setIsMobile(window.innerWidth <= 768);
                window.addEventListener("resize", checkMobile);
                return () => window.removeEventListener("resize", checkMobile);
        }, []);

        useEffect(() => {
                const fetchData = async () => {
                        try {
                                const result = await axios("https://iracing6-backend.herokuapp.com/api/sof-results/sofresults");

                                // convert each item's start_time to hour of day in UTC
                                result.data.forEach((item) => {
                                        const startTime = new Date(item.start_time);
                                        item.start_time = startTime.getUTCHours();
                                });
                                setData(result.data);
                        } catch (error) {
                                console.error("Error fetching data: ", error);
                        }
                };

                fetchData();
        }, []);

        useEffect(() => {
                let newFilteredData = data ? [...data] : []; // Check if data is not null before copying

                // Apply category filter
                if (filter === "sports car") {
                        newFilteredData = newFilteredData.filter((item) => SportsCarSeriesKeywords.some((keyword) => item.season_name.includes(keyword)));
                } else if (filter === "oval") {
                        newFilteredData = newFilteredData.filter((item) => OvalSeriesKeywords.some((keyword) => item.season_name.includes(keyword)));
                } else if (filter === "dirt road") {
                        newFilteredData = newFilteredData.filter((item) => DirtRoadSeriesKeywords.some((keyword) => item.season_name.includes(keyword)));
                } else if (filter === "dirt oval") {
                        newFilteredData = newFilteredData.filter((item) => DirtOvalSeriesKeywords.some((keyword) => item.season_name.includes(keyword)));
                } else if (filter === "formula car") {
                        newFilteredData = newFilteredData.filter((item) => FormulaCarSeriesKeywords.some((keyword) => item.season_name.includes(keyword)));
                }

                // Apply wet track filter
                if (wetTrack) {
                        newFilteredData = newFilteredData.filter((item) => item.precip_time_pct > 0);
                }

                // The rest of your logic to handle season-track mapping and setting states
                const seasonTrackMap = new Map();
                newFilteredData.forEach((item) => {
                        const trimmedSeasonName = trimSeasonName(item.season_name);
                        if (!seasonTrackMap.has(trimmedSeasonName)) {
                                seasonTrackMap.set(trimmedSeasonName, item.track_name);
                        }
                });

                setFilteredData1(newFilteredData);

                const combinedData = Array.from(seasonTrackMap, ([season, track]) => ({
                        season, // Already trimmed above
                        track,
                }));
                setSeasonTrackData(combinedData);
        }, [data, filter, wetTrack]);

        // Method to get the icon URL
        const getIconUrl = (seasonName) => {
                const iconName = getIconFileName(seasonName);
                // Assuming the icons are stored in the public folder under assets
                return `${process.env.PUBLIC_URL}/assets/series-icons/${iconName}.png`;
        };

        // Function to trim season names for display
        const displayTrimSeasonName = (seasonName) => {
                return seasonName
                        .replace("2024 Season 3", "") // Remove "2024 Season 3"
                        .replace(/-/g, " ") // Replace hyphens with spaces
                        .replace(/\s+/g, " ") // Replace multiple spaces with a single space
                        .replace(/Fixed Fixed/g, "Fixed") // Replace "Fixed Fixed" with "Fixed"
                        .trim(); // Trim leading and trailing spaces
        };

        // KEYWORDS******************************************************************************************************************************************************
        // KEYWORDS******************************************************************************************************************************************************
        const FormulaCarSeriesKeywords = ["Formula", "Skip Barber", "US Open Wheel", "Grand Prix Legends", "F4"];
        const SportsCarSeriesKeywords = [
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
        ];
        const OvalSeriesKeywords = [
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
        ];
        const DirtRoadSeriesKeywords = ["iRX", "Rookie Pro", "Pro 4 Off", "Pro 2 Off", "Pro Lite", "Pro 2 Lite", "Pro 4 Lite", "Rallycross"];
        const DirtOvalSeriesKeywords = ["Dirt Legends", "USAC", "World of Outlaws", "Sprint Car Cup", "Dirt Super Late", "Dirt 410", "Midget", "DIRTcar", "WoO", "Micro", "Legends Cup"];
        // KEYWORDS******************************************************************************************************************************************************
        // KEYWORDS******************************************************************************************************************************************************
        const calculateAverageSessionPerSeason = () => {
                const seasonSessions = {};
                const sessionCounts = {};
                const sessionPopulation = {};

                const ignoredSeasons = ["NASCAR iRacing Series - 2023 Season Open", "NASCAR iRacing Series - 2023 Season Fixed", "eNASCAR Road To Pro Qual Series Round 1 - 2023 Season"];

                const filteredData = filteredData1.filter((item) => {
                        const isTimeInRange = (startTime, rangeStart, rangeEnd) => {
                                if (rangeStart <= rangeEnd) {
                                        // Normal range, e.g., 1 to 3
                                        return startTime >= rangeStart && startTime <= rangeEnd;
                                } else {
                                        // Wrap-around range, e.g., 23 to 3
                                        return startTime >= rangeStart || startTime <= rangeEnd;
                                }
                        };

                        return (
                                item.event_strength_of_field >= strengthRange[0] &&
                                item.event_strength_of_field <= strengthRange[1] &&
                                !ignoredSeasons.includes(item.season_name) &&
                                isTimeInRange(item.start_time, startTimesRange[0], startTimesRange[1])
                        );
                });

                filteredData.forEach((item) => {
                        const { season_name, session_id, population } = item;

                        // Ignore item if season_name is undefined
                        if (!season_name) {
                                return;
                        }

                        if (season_name in seasonSessions) {
                                seasonSessions[season_name].push(session_id);
                        } else {
                                seasonSessions[season_name] = [session_id];
                        }

                        if (session_id in sessionPopulation) {
                                sessionPopulation[session_id] += population;
                        } else {
                                sessionPopulation[session_id] = population;
                        }
                });

                for (let season in seasonSessions) {
                        const sessionIds = seasonSessions[season];
                        sessionCounts[season] = {};

                        sessionIds.forEach((sessionId) => {
                                if (sessionId in sessionCounts[season]) {
                                        sessionCounts[season][sessionId]++;
                                } else {
                                        sessionCounts[season][sessionId] = 1;
                                }
                        });
                }

                const averageRepetitionPerSeason = {};
                const averagePopulationPerSeason = {};
                for (let season in sessionCounts) {
                        const totalCount = Object.values(sessionCounts[season]).reduce((a, b) => a + b, 0);
                        averageRepetitionPerSeason[season] = totalCount / Object.keys(sessionCounts[season]).length;

                        let totalPopulation = 0;
                        for (let sessionId in sessionCounts[season]) {
                                totalPopulation += sessionPopulation[sessionId];
                        }
                        averagePopulationPerSeason[season] = totalPopulation / Object.keys(sessionCounts[season]).length;
                }

                return { averageRepetitionPerSeason, averagePopulationPerSeason };
        };

        const updateRange = (e, index) => {
                const newRange = [...strengthRange];
                newRange[index] = e.target.value === "Max" ? 99999 : parseInt(e.target.value, 10);
                setStrengthRange(newRange);
        };

        const updateHourRange = (e, index) => {
                const newRange = [...startTimesRange];
                newRange[index] = e.target.value === "Max" ? 99999 : parseInt(e.target.value, 10);
                setStartTimesRange(newRange);
        };

        const handleBarClick = (data) => {
                // Extract the index of the clicked bar
                const clickedBarIndex = data.points[0].pointIndex;

                // Get the original season name from the seasonsData array using the clicked bar's index
                const originalSeasonName = seasonsData[clickedBarIndex + page * itemsPerPage].season;

                // Construct the URL using the original season name
                const url = `/charts/SeriesLapTimeChart/${encodeURIComponent(originalSeasonName)}`;

                // Redirect the user to the desired URL
                window.location.href = url;
        };

        const handleSeriesLinkTable = (season) => {
                // https://iracingdata.com/charts/SeriesLapTimeChart/${encodeURIComponent(originalSeasonName)}
                const url = `/charts/SeriesLapTimeChart/${encodeURIComponent(season)}`;

                // Redirect the user to the desired URL
                window.location.href = url;
        };

        if (!data)
                return (
                        <div>
                                <div className="spinner"></div>
                                <div className="loading-text-div-sp">Loading data...</div>
                        </div>
                );

        const { averageRepetitionPerSeason, averagePopulationPerSeason } = calculateAverageSessionPerSeason();

        const seasonsData = Object.keys(averageRepetitionPerSeason).map((season) => ({
                season,
                averageRepetition: averageRepetitionPerSeason[season],
                averagePopulation: averagePopulationPerSeason[season],
        }));

        seasonsData.sort((a, b) => b.averagePopulation - a.averagePopulation);

        // trimming season names
        const pageData = {
                seasons: seasonsData.slice(page * itemsPerPage, (page + 1) * itemsPerPage).map((item) => item.season),
                repetitions: seasonsData.slice(page * itemsPerPage, (page + 1) * itemsPerPage).map((item) => item.averageRepetition),
                populations: seasonsData.slice(page * itemsPerPage, (page + 1) * itemsPerPage).map((item) => item.averagePopulation),
        };

        const linkIcon =
                //if mobile, show 🡵
                window.innerWidth < 800 ? "🔗" : "🡵";

        // Create a separate array for Plotly with trimmed season names
        const plotlySeasonNames = pageData.seasons.map(displayTrimSeasonName);

        //console log all of the season names that do not match any of the category keywords
        seasonsData.forEach((item) => {
                if (
                        !FormulaCarSeriesKeywords.some((keyword) => item.season.includes(keyword)) &&
                        !SportsCarSeriesKeywords.some((keyword) => item.season.includes(keyword)) &&
                        !OvalSeriesKeywords.some((keyword) => item.season.includes(keyword)) &&
                        !DirtRoadSeriesKeywords.some((keyword) => item.season.includes(keyword)) &&
                        !DirtOvalSeriesKeywords.some((keyword) => item.season.includes(keyword))
                ) {
                }
        });

        return (
                <div>
                        <div className="top-background-div-spop-cont">
                                {/* <div className="top-background-div-spop">
                                        <h1>Working on the new week </h1>
                                </div> */}
                                {/* <div className="click-here-text-spop">
                                        <h2>Here's Last week's data in the mean time:</h2>
                                </div> */}
                        </div>

                        <div className="filters-banner-sof">
                                <div className="container-sof-changer">
                                        <div className="sof-color-background">
                                                <label className="sof-sp-label">Strength of Field:</label>
                                                <input type="number" className="min-sof-sp" value={strengthRange[0]} onChange={(e) => updateRange(e, 0)} placeholder="Enter minimum strength" />
                                                <span className="sof-sp-label">to</span>
                                                <input
                                                        type="number"
                                                        className="max-sof-sp"
                                                        value={strengthRange[1]}
                                                        max="999999"
                                                        onChange={(e) => updateRange(e, 1)}
                                                        placeholder="Enter maximum strength"
                                                />
                                        </div>
                                </div>

                                <div className="hour-of-day-selector">
                                        <div className="sof-color-background">
                                                <label className="sof-sp-label">Hour of Day (UTC):</label>
                                                <input
                                                        type="number"
                                                        className="min-hour-selector"
                                                        value={startTimesRange[0]}
                                                        onChange={(e) => updateHourRange(e, 0)}
                                                        placeholder="Enter minimum hour"
                                                />
                                                <span className="sof-sp-label">to</span>
                                                <input
                                                        type="number"
                                                        className="max-hour-selector"
                                                        value={startTimesRange[1]}
                                                        max="24"
                                                        onChange={(e) => updateHourRange(e, 1)}
                                                        placeholder="Enter maximum hour"
                                                />
                                        </div>
                                </div>
                                <div className="hour-of-day-selector">
                                        <div className="current-utc-time-container">
                                                <div className="sof-color-background">
                                                        <div className="sof-sp-label">Current Hour:</div>
                                                        <div className="sof-sp-label">{new Date().getUTCHours()}</div>
                                                </div>
                                        </div>

                                        <div className="wet-toggle-container">
                                                <div className="sof-color-background">
                                                        <div className="sof-sp-label">Rain:</div>

                                                        <input type="checkbox" onChange={() => setWetTrack(!wetTrack)} />
                                                </div>
                                        </div>
                                </div>
                        </div>

                        <div className="chart-cat-buttons-sp-container">
                                <button className="chart-cat-buttons-sp-div-le" onClick={() => setFilter("all")}>
                                        All
                                </button>
                                <button className="chart-cat-buttons-sp-div" onClick={() => setFilter("sports car")}>
                                        Sports Car
                                </button>
                                <button className="chart-cat-buttons-sp-div" onClick={() => setFilter("formula car")}>
                                        Formula Car
                                </button>
                                <button className="chart-cat-buttons-sp-div" onClick={() => setFilter("oval")}>
                                        Oval
                                </button>
                                <button className="chart-cat-buttons-sp-div" onClick={() => setFilter("dirt road")}>
                                        Dirt Road
                                </button>
                                <button className="chart-cat-buttons-sp-div-re" onClick={() => setFilter("dirt oval")}>
                                        Dirt Oval
                                </button>
                        </div>

                        <Plot
                                onClick={(data) => handleBarClick(data)}
                                data={[
                                        {
                                                type: "bar",
                                                x: pageData.repetitions,
                                                y: plotlySeasonNames,
                                                orientation: "h",
                                                name: window.innerWidth > 800 ? "Avg # of splits" : "Avg Splits",
                                                marker: {
                                                        color: "rgba(241, 196, 15, 0.7)",
                                                        line: {
                                                                color: "#E6C236",
                                                                width: 1,
                                                        },
                                                },
                                                text: "",
                                                textposition: "inside right",
                                                hovertemplate: window.innerWidth > 800 ? "<i>Average # of splits</i>: %{x}<extra></extra>" : "<i>Splits</i>: %{x}<extra></extra>",
                                        },
                                        {
                                                type: "bar",
                                                x: pageData.populations,
                                                y: plotlySeasonNames,
                                                orientation: "h",
                                                name: window.innerWidth > 800 ? "Avg Race Entrants" : "Avg Entrants",
                                                marker: {
                                                        color: "#3d3d3d",
                                                        line: {
                                                                color: "#7d7d7d",
                                                                width: 1,
                                                        },
                                                },

                                                text:
                                                        window.innerWidth < 800
                                                                ? pageData.seasons.map((season, index) => {
                                                                          const trackName = seasonTrackData.find((item) => item.season === season)?.track || "Unknown";
                                                                          return `${plotlySeasonNames[index]}<br>${trackName}`;
                                                                  })
                                                                : pageData.seasons.map((season, index) => {
                                                                          const trackName = seasonTrackData.find((item) => item.season === season)?.track || "Unknown";
                                                                          return `${plotlySeasonNames[index]}  (${trackName}) `;
                                                                  }),

                                                textposition: window.innerWidth > 800 ? "inside right" : "inside right", // "inside right" : "inside",
                                                hovertemplate: window.innerWidth > 800 ? "<i>Average Race Entrants</i>: %{x}<extra></extra>" : "<i>Entrants</i>: %{x}<br><b>%{y}</b><extra></extra>",
                                        },
                                ]}
                                layout={{
                                        margin: window.innerWidth > 800 ? { l: 130, r: 110, t: 0, b: 30 } : { l: 6, r: 0, t: 90, b: 100 },
                                        plot_bgcolor: "#29272b",
                                        paper_bgcolor: "#29272b",
                                        barmode: "stack",
                                        title: {
                                                text: "Season 3, 2024: Week 2/13",
                                                font: { color: "rgba(200, 200, 200, 1)", size: window.innerWidth > 800 ? 15 : 15 },
                                        },
                                        xaxis: {
                                                title: window.innerWidth > 800 ? "Entrants" : "",
                                                color: "rgba(200, 200, 200, 1)",
                                        },
                                        yaxis: {
                                                title: "",
                                                autorange: "reversed",
                                                color: "rgba(200, 200, 200, 1)",
                                                showticklabels: false,
                                        },
                                        legend: window.innerWidth < 800 ? { x: 0.3, y: -0.1, xanchor: "center", yanchor: "top" } : { x: 1, y: 1.1, xanchor: "right", yanchor: "top" },
                                        autosize: true,
                                        font: {
                                                family: "Questrial, sans-serif",
                                                size: window.innerWidth < 800 ? 10 : 12,
                                                color: "#dddddd",
                                        },
                                        width: window.innerWidth > 800 ? window.innerWidth - 80 : window.innerWidth - 20,
                                        height: window.innerWidth > 800 ? 740 : window.innerHeight - 200,
                                }}
                                config={isMobile ? { displayModeBar: false } : { displayModeBar: false }}
                        />

                        <div className="chart-nav-buttons-sp-container">
                                <button style={{ visibility: page === 0 ? "hidden" : "visible" }} onClick={() => setPage(page - 1)} className="prev-button-sp">
                                        ← Previous
                                </button>
                                <button
                                        style={{
                                                visibility: (page + 1) * itemsPerPage < seasonsData.length ? "visible" : "hidden",
                                        }}
                                        onClick={() => setPage(page + 1)}
                                        className="next-button-sp"
                                >
                                        Next →
                                </button>
                        </div>

                        <div className="data-table-container-sp">
                                <table className="data-table-sp">
                                        <thead>
                                                <tr className="tr-sp-title">
                                                        <th>Season</th>
                                                        <th>Track Name</th> {/* New column for track name */}
                                                        <th>Avg # of Splits</th>
                                                        <th>Avg Race Entrants</th>
                                                </tr>
                                        </thead>
                                        <tbody>
                                                {pageData.seasons.map((season, index) => {
                                                        const trimmedSeasonName = displayTrimSeasonName(season); // Trim for display
                                                        const trackName = seasonTrackData.find((item) => item.season === season)?.track || "Unknown";

                                                        return (
                                                                <tr key={index} className="table-row-div1">
                                                                        <td className="td-pointer" onClick={() => handleSeriesLinkTable(season)}>
                                                                                <img
                                                                                        src={getIconUrl(season)}
                                                                                        style={{
                                                                                                marginRight: "1rem",
                                                                                                marginLeft: "0.6rem",
                                                                                                width: "2.2rem",
                                                                                                marginTop: "0rem",
                                                                                                marginBottom: "0rem",
                                                                                        }}
                                                                                />
                                                                                {trimmedSeasonName} {/* Display trimmed season name */}
                                                                        </td>
                                                                        <td>{trackName}</td>
                                                                        <td>{pageData.repetitions[index].toFixed(2)}</td>
                                                                        <td>{pageData.populations[index].toFixed(2)}</td>
                                                                </tr>
                                                        );
                                                })}
                                        </tbody>
                                </table>
                        </div>

                        <div className="chart-nav-buttons-sp-container">
                                <button style={{ visibility: page === 0 ? "hidden" : "visible" }} onClick={() => setPage(page - 1)} className="prev-button-sp">
                                        ← Previous
                                </button>
                                <button
                                        style={{
                                                visibility: (page + 1) * itemsPerPage < seasonsData.length ? "visible" : "hidden",
                                        }}
                                        onClick={() => setPage(page + 1)}
                                        className="next-button-sp"
                                >
                                        Next →
                                </button>
                        </div>

                        <div className="sp-disclaimer-text-div">
                                This chart does not take in to account factors such as series which race hourly vs every x hours, and uses session SOF rather than individual iRatings.
                        </div>
                </div>
        );
}

export default SeriesPopularity;
