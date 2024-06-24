import React, { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import "../styles/IRatingGraph.css";

const IRatingGraph = () => {
        const [iRatings, setIRatings] = useState([]);
        const [loading, setLoading] = useState(true);
        const [userIRating, setUserIRating] = useState("");
        const [percentile, setPercentile] = useState(null);
        const [dataType, setDataType] = useState("SportsCar");
        const [timeFrame, setTimeFrame] = useState("All Time");

        useEffect(() => {
                setUserIRating("");
                setPercentile(null);
                async function fetchData() {
                        setLoading(true);
                        try {
                                const timeFrameValue = getTimeFrameValue(timeFrame);

                                const response = await axios.get(`https://iracing6-backend.herokuapp.com/api/irating-data/iratings${dataType}/${timeFrameValue}`);

                                setIRatings(response.data);
                                setLoading(false);
                        } catch (error) {
                                console.error("Error fetching iRatings data:", error);
                        }
                }
                fetchData();
        }, [dataType, timeFrame]);

        const getTimeFrameValue = (timeFrame) => {
                switch (timeFrame) {
                        case "1 Year":
                                return 2024;
                        case "2 Years":
                                return 2023;
                        case "3 Years":
                                return 2022;
                        case "4 Years":
                                return 2021;
                        case "All Time":
                                return 1;
                        default:
                                return 1;
                }
        };

        const calculatePercentile = (iRating) => {
                const sortedIRatings = [...iRatings].sort((a, b) => a - b);
                const index = sortedIRatings.findIndex((r) => r > iRating);
                const percentile = index === -1 ? 100 : (index / sortedIRatings.length) * 100;
                setPercentile(percentile);
        };

        const handleUserIRatingChange = (event) => {
                setUserIRating(event.target.value);
                if (event.target.value !== "") {
                        calculatePercentile(parseInt(event.target.value, 10));
                } else {
                        setPercentile(null);
                }
        };

        if (loading) {
                return (
                        <div>
                                <div className="spinner"></div>
                                <div className="loading-text-div">Loading data...</div>
                                <div className="smol-bottom-text-ird">This takes up to 30 seconds</div>
                        </div>
                );
        }

        const groupIRatingsByRange = (iRatings) => {
                const groupedIRatings = {};

                iRatings.forEach((iRating) => {
                        const range = Math.floor(iRating / 100) * 100;
                        if (groupedIRatings[range]) {
                                groupedIRatings[range] += 1;
                        } else {
                                groupedIRatings[range] = 1;
                        }
                });

                return groupedIRatings;
        };

        const groupedIRatings = groupIRatingsByRange(iRatings);

        const totalResults = iRatings.length;
        const percentageOfResults = Object.values(groupedIRatings).map((count) => (count / totalResults) * 100);

        const data = [
                {
                        x: Object.keys(groupedIRatings).map((range) => parseInt(range, 10) + 50),
                        y: Object.values(groupedIRatings),
                        type: "bar",
                        marker: {
                                color: "#154fa7",
                                line: {
                                        color: "#3e8bff",
                                        width: 1,
                                },
                        },
                        hovertemplate: "%{customdata:.2f}%<extra></extra>", // Custom hovertemplate
                        customdata: percentageOfResults, // Add custom data for percentages
                },
        ];

        const darkLayout = {
                title: {
                        text: `iRatings ${dataType} Distribution (${timeFrame})`,
                        font: {
                                color: "white",
                        },
                },
                xaxis: {
                        title: {
                                text: "iRating",
                                font: {
                                        color: "white",
                                },
                        },
                        tick0: 0,
                        dtick: window.innerWidth > 800 ? 100 : 500,
                        showgrid: true,
                        zeroline: true,
                        gridcolor: "#444",
                        zerolinecolor: "#444",
                        linecolor: "#cfcfcf",
                        range: window.innerWidth > 800 ? [0, 5000] : [0, 3000], // Adjust these values for the desired initial x-axis zoom
                        tickfont: {
                                color: "#cfcfcf",
                        },
                },
                yaxis: {
                        title: {
                                text: "",
                                font: {
                                        color: "#cfcfcf",
                                },
                        },
                        showline: true,
                        zeroline: true,
                        gridcolor: "#444",
                        zerolinecolor: "#444",
                        linecolor: "#cfcfcf",
                        tickfont: {
                                color: "white",
                        },
                        showticklabels: false,
                },
                width: window.innerWidth > 800 ? window.innerWidth - 30 : window.innerWidth - 20, // Adjust this value for the desired width
                height: window.innerWidth > 800 ? 600 : 500, // Adjust this value for the desired height
                margin: window.innerWidth > 800 ? { l: 80, r: 80, t: 60, b: 60 } : { l: 10, r: 20, t: 100, b: 80 },
                autosize: false,
                plot_bgcolor: "#29272b",
                paper_bgcolor: "#29272b",
                font: {
                        color: "#cfcfcf",
                        family: "Questrial, sans-serif",
                },
        };

        return (
                <div>
                        <div className="time-frame-cont-div">
                                <div className={timeFrame === "All Time" ? "time-frame-div-selection-selected" : "time-frame-div-selection"} onClick={() => setTimeFrame("All Time")}>
                                        {" "}
                                        All Time
                                </div>
                                <div className={timeFrame === "1 Year" ? "time-frame-div-selection-selected" : "time-frame-div-selection"} onClick={() => setTimeFrame("1 Year")}>
                                        {" "}
                                        1 Year
                                </div>
                                <div className={timeFrame === "2 Years" ? "time-frame-div-selection-selected" : "time-frame-div-selection"} onClick={() => setTimeFrame("2 Years")}>
                                        {" "}
                                        2 Years
                                </div>
                                <div className={timeFrame === "3 Years" ? "time-frame-div-selection-selected" : "time-frame-div-selection"} onClick={() => setTimeFrame("3 Years")}>
                                        {" "}
                                        3 Years
                                </div>
                                <div className={timeFrame === "4 Years" ? "time-frame-div-selection-selected" : "time-frame-div-selection"} onClick={() => setTimeFrame("4 Years")}>
                                        {" "}
                                        4 Years
                                </div>
                        </div>

                        <div className="data-type-buttons">
                                {" "}
                                <button
                                        className="incpc-cat-button-le"
                                        onClick={() => {
                                                setDataType("SportsCar");
                                                setUserIRating("");
                                                setPercentile(null);
                                        }}
                                >
                                        Sports Car
                                </button>
                                <button
                                        className="incpc-cat-button"
                                        onClick={() => {
                                                setDataType("FormulaCar");
                                                setUserIRating("");
                                                setPercentile(null);
                                        }}
                                >
                                        Formula Car
                                </button>
                                <button
                                        className="incpc-cat-button"
                                        onClick={() => {
                                                setDataType("Oval");
                                                setUserIRating("");
                                                setPercentile(null);
                                        }}
                                >
                                        Oval
                                </button>
                                <button
                                        className="incpc-cat-button"
                                        onClick={() => {
                                                setDataType("DirtRoad");
                                                setUserIRating("");
                                                setPercentile(null);
                                        }}
                                >
                                        Dirt Road
                                </button>
                                <button
                                        className="incpc-cat-button-re"
                                        onClick={() => {
                                                setDataType("DirtOval");
                                                setUserIRating("");
                                                setPercentile(null);
                                        }}
                                >
                                        Dirt Oval
                                </button>
                        </div>
                        <div className="smol-top-div"></div>
                        <Plot data={data} layout={darkLayout} config={{ displayModeBar: false }} />
                        <div className="percentile-title-container">
                                <div className="percentile-title-div">calculate percentile</div>
                        </div>
                        <div className="percentile-div-class">
                                <div className="percentile-background-div">
                                        <div>
                                                <label htmlFor="userIRating" className="irating-label-perc">
                                                        iRating:{" "}
                                                </label>
                                                <input type="number" id="userIRating" name="userIRating" className="percentile-input" value={userIRating} onChange={handleUserIRatingChange} />
                                        </div>
                                        {percentile !== null && (
                                                <p>
                                                        Percentile: <h2>{percentile.toFixed(2)}</h2>
                                                </p>
                                        )}
                                </div>
                        </div>
                        <div className="smol-bottom-text-ird">
                                Time frame options are all including present day. For example, "1 year" is 1 year ago to present. The time frame refers to the last time that a user's iRating changed
                                (in an official race). The chart excludes the default ratings of 1350 and 1250.
                        </div>
                </div>
        );
};

export default IRatingGraph;
