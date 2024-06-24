import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Plot from "react-plotly.js";
import "../styles/BoxPlot.scss";

export const BoxPlotChart = ({ season, tracks }) => {
        const [isLoading, setIsLoading] = useState(true);
        const [carData, setCarData] = useState([]);
        const [lastUpdated, setLastUpdated] = useState("");
        const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
        const [displayRaceBest, setDisplayRaceBest] = useState(true);

        useEffect(() => {
                const checkMobile = () => setIsMobile(window.innerWidth <= 768);
                window.addEventListener("resize", checkMobile);
                return () => window.removeEventListener("resize", checkMobile);
        }, []);

        useEffect(() => {
                const fetchData = async () => {
                        setIsLoading(true);
                        const allData = [];
                        for (const track of tracks) {
                                try {
                                        const response = await fetch(`https://iracing6-backend.herokuapp.com/api/times-by-car/seasons/${season}/tracks/${track}`);
                                        const jsonData = await response.json();
                                        if (response.ok) {
                                                allData.push(...jsonData);
                                        } else {
                                                console.error(`Failed to fetch data for track: ${track}. Reason: ${jsonData.error || "Unknown"}`);
                                        }
                                } catch (error) {
                                        console.error(`Failed to fetch data for track: ${track}. Error: ${error.message}`);
                                }
                        }
                        setCarData(allData);
                        setIsLoading(false);
                };
                fetchData();
        }, [season, tracks]);

        useEffect(() => {
                const fetchDate = async () => {
                        const response = await fetch("https://iracing6-backend.herokuapp.com/api/times-by-car/last-updated");
                        const jsonData = await response.json();
                        setLastUpdated(jsonData);
                };
                fetchDate();
        }, []);

        function filterOutliers(data, factor = 1.5) {
                const q1 = percentile(data, 25);
                const q3 = percentile(data, 75);
                const iqr = q3 - q1;
                const lowerBound = q1 - factor * iqr;
                const upperBound = q3 + factor * iqr;
                return data.filter((value) => value >= lowerBound && value <= upperBound);
        }

        function percentile(data, p) {
                const sorted = [...data].sort((a, b) => a - b);
                const index = (p / 100) * sorted.length;
                if (Number.isInteger(index)) {
                        return (sorted[index - 1] + sorted[index]) / 2;
                } else {
                        return sorted[Math.floor(index)];
                }
        }

        const carColors = {
                "Audi R8 LMS GT3": "rgb(151, 151, 151)",
                "Audi R8 LMS EVO II GT3": "rgb(151, 151, 151)",
                "Mercedes-AMG GT3 2020": "rgb(56, 144, 144)",
                "Ford GT GT3": "rgb(48, 62, 137)",
                "Ferrari 296 GT3": "rgb(176, 16, 48)",
                "McLaren MP4-12C GT3": "rgb(204, 112, 0)",
                "BMW M4 GT3": "rgb(0, 123, 174)",
                "Lamborghini Huracán GT3 EVO": "rgb(51, 134, 51)",
                "Porsche 911 GT3 R (992)": "#b08d57",
                "McLaren 570S GT4": "rgb(204, 112, 0)",
                "BMW M4 GT4": "rgb(0, 123, 174)",
                "Porsche 718 Cayman GT4 Clubsport MR": "#b08d57",
                "Mercedes-AMG GT4": "rgb(56, 144, 144)",
                "Aston Martin Vantage GT4": "rgb(11, 94, 11)",
                "BMW M Hybrid V8": "rgb(0, 73, 124)",
                "Dallara P217": "rgb(121, 50, 175)",
                "Hyundai Elantra N TC": "rgb(0, 46, 106)",
                "Porsche 963 GTP": "rgb(0, 46, 106)",
                "Audi RS 3 LMS": "rgb(151, 151, 151)",
                "Hyundai Veloster N TC": "rgb(40, 54, 162)",
                "Honda Civic Type R": "rgb(163, 0, 0)",
                "Cadillac V-Series.R GTP": "rgb(203, 165, 41)",
                "Ligier JS P320": "#4f72a8",
                "Toyota GR86": "#EB0A1E",
                "Acura ARX-06 GTP": "#EB0A1E",
                "Global Mazda MX-5 Cup": "rgb(0, 73, 124)",
                "Ford Mustang FR500S": "rgb(0, 46, 106)",
                "Renault Clio": "rgb(188, 156, 0)",
                "Porsche 911 RSR": "#b08d57",
                "Chevrolet Corvette C8.R GTE": "rgb(100, 100, 100)",
                "BMW M8 GTE": "rgb(0, 123, 174)",
                "Ferrari 488 GTE": "rgb(176, 16, 48)",
                "Ford GTE": "rgb(48, 62, 137)",
                "Ford Mustang GT3": "rgb(0,0,205)",
                "Chevrolet Corvette Z06 GT3.R": "rgb(100, 100, 100)",
        };

        const groupedCarData = carData.reduce((acc, car) => {
                if (!acc[car.track_name]) {
                        acc[car.track_name] = [];
                }
                acc[car.track_name].push(car);
                return acc;
        }, {});

        const createPlots = (carData, dataKey, titleSuffix) => {
                return Object.entries(carData).map(([trackName, trackCarData]) => {
                        const filteredCarData = trackCarData.map((car) => ({
                                ...car,
                                [dataKey]: filterOutliers(car[dataKey]),
                        }));

                        const medianLapTimes = filteredCarData.map((car) => {
                                return percentile(car[dataKey], 50);
                        });

                        filteredCarData.sort((a, b) => {
                                const aIndex = filteredCarData.indexOf(a);
                                const bIndex = filteredCarData.indexOf(b);
                                return medianLapTimes[bIndex] - medianLapTimes[aIndex];
                        });

                        const data = filteredCarData.map((car) => {
                                return {
                                        x: car[dataKey].map((time) => time / 10000),
                                        type: "box",
                                        name: `${car.car_name}   (${car[dataKey].length})`,
                                        boxpoints: false,
                                        marker: {
                                                color: carColors[car.car_name],
                                        },
                                };
                        });

                        let totalSampleSize = 0;
                        filteredCarData.forEach((car) => {
                                totalSampleSize += car[dataKey].length;
                        });

                        const layout = {
                                title: {
                                        font: {
                                                color: "rgba(200, 200, 200, 1)",
                                                size: window.innerWidth > 800 ? 15 : 11,
                                        },
                                        text: `${trackName} (${totalSampleSize} entrants) ${titleSuffix}`,
                                },
                                xaxis: {
                                        title: "Lap Time (seconds)",
                                        titlefont: {
                                                color: "rgba(200, 200, 200, 1)",
                                                size: window.innerWidth > 800 ? 12 : 10, // Adjust the size as needed
                                        },
                                },
                                yaxis: {
                                        showticklabels: false,
                                },
                                hovermode: false,
                                legend: {},
                        };

                        const darkModeLayout = {
                                ...layout,
                                plot_bgcolor: "#29272b",
                                paper_bgcolor: "#29272b",
                                xaxis: {
                                        ...layout.xaxis,
                                        gridcolor: "rgba(80, 80, 80, 1)",
                                        tickfont: {
                                                color: "rgba(200, 200, 200, 1)",
                                        },
                                },
                                yaxis: {
                                        ...layout.yaxis,
                                        gridcolor: "rgba(80, 80, 80, 1)",
                                },
                                titlefont: {
                                        color: "rgba(200, 200, 200, 1)",
                                },
                                legend: {
                                        ...layout.legend,
                                        font: {
                                                color: "rgba(200, 200, 200, 1)",
                                                size: window.innerWidth > 800 ? 12 : 11,
                                        },
                                        orientation: window.innerWidth < 800 ? "h" : "v",
                                        x: window.innerWidth < 800 ? 0 : layout.legend.x,
                                        y: window.innerWidth < 800 ? -0.4 : layout.legend.y,
                                },
                                width: window.innerWidth > 800 ? 1200 : window.innerWidth,
                                height: 500,
                                margin: window.innerWidth > 800 ? { l: 40, r: 40, t: 60, b: 100 } : { l: 10, r: 8, t: 30, b: 240 },
                                autosize: false,
                        };

                        return (
                                <div key={trackName} className="box-plot-container">
                                        <Plot data={data} layout={darkModeLayout} config={{ displayModeBar: false, staticPlot: true }} />
                                </div>
                        );
                });
        };

        const racePlots = createPlots(groupedCarData, "race_best", "(Race Best)");
        const qualPlots = createPlots(groupedCarData, "qual_best", "(Qual Best)");

        const toggleDisplay = () => {
                setDisplayRaceBest(!displayRaceBest);
        };

        if (isLoading) {
                return (
                        <div>
                                <div className="spinner"></div>
                                <div className="loading-text-div-bpc">Loading data...</div>
                        </div>
                );
        } else {
                return (
                        <div className="plots-container">
                                <div className="top-text-container">
                                        <h2 className="season-name-text">{decodeURI(season)}</h2>
                                        <h3 className="date-text">Last Updated: {lastUpdated.last_updated}</h3>
                                </div>
                                <button onClick={toggleDisplay} className="race-quali-button">
                                        {displayRaceBest ? "Show Qual Best" : "Show Race Best"}
                                </button>
                                {displayRaceBest ? racePlots.reverse() : qualPlots.reverse()}
                                <div className="footer-text-chart-page">Calculated using best race lap times.</div>
                                <div className="disclaimer-text-bpc">
                                        Box plots offer an imperfect overview of data distribution. Keep in mind other variables such as number of entries, visible in the legend.{" "}
                                </div>
                        </div>
                );
        }
};
