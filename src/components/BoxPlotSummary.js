import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import "../styles/BoxPlot.scss";

export const BoxPlotSummary = ({ season, tracks }) => {
        const [isLoading, setIsLoading] = useState(true);
        const [carData, setCarData] = useState([]);

        useEffect(() => {
                const fetchData = async () => {
                        setIsLoading(true);
                        const allData = [];
                        for (const track of tracks) {
                                const response = await fetch(`https://iracing6-backend.herokuapp.com/api/times-by-car/seasons/${season}/tracks/${track}`);
                                const jsonData = await response.json();
                                allData.push(...jsonData);
                        }
                        setCarData(allData);
                        setIsLoading(false);
                };
                fetchData();
        }, [season, tracks]);

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
                "Audi R8 LMS GT3": "rgb(189, 189, 189)",
                "Mercedes-AMG GT3 2020": "rgb(70, 180, 180)",
                "Ford GT GT3": "rgb(60, 77, 171)",
                "Ferrari 488 GT3 Evo 2020": "rgb(220, 20, 60)",
                "McLaren MP4-12C GT3": "rgb(255, 140, 0)",
                "BMW M4 GT3": "rgb(0, 154, 218)",
                "Lamborghini Huracán GT3 EVO": "rgb(64, 168, 64)",
                "Porsche 911 GT3 R": "rgb(235, 195, 0)",
                "McLaren 570S GT4": "rgb(255, 140, 0)",
                "BMW M4 GT4": "rgb(0, 154, 218)",
                "Porsche 718 Cayman GT4 Clubsport MR": "rgb(235, 195, 0)",
                "Mercedes-AMG GT4": "rgb(70, 180, 180)",
                "Aston Martin Vantage GT4": "rgb(14, 118, 14)",
                "BMW M Hybrid V8": "rgb(0, 154, 218)",
                "Dallara P217": "rgb(151, 62, 219)",
                "Hyundai Elantra N TC": "rgb(0, 57, 132)",
                "Audi RS 3 LMS": "rgb(189, 189, 189)",
                "Hyundai Veloster N TC": "rgb(50, 67, 202)",
                "Honda Civic Type R": "rgb(204, 0, 0)",
        };

        const filteredCarData = carData.map((car) => ({
                ...car,
                race_best: filterOutliers(car.race_best),
        }));

        const medianLapTimes = filteredCarData.map((car) => {
                return percentile(car.race_best, 50);
        });

        filteredCarData.sort((a, b) => {
                const aIndex = filteredCarData.indexOf(a);
                const bIndex = filteredCarData.indexOf(b);
                return medianLapTimes[bIndex] - medianLapTimes[aIndex];
        });

        const data = filteredCarData.map((car) => {
                return {
                        x: car.race_best.map((time) => time / 10000),
                        type: "box",
                        name: `${car.car_name}   (${car.race_best.length})`,
                        boxpoints: false,
                        marker: {
                                color: carColors[car.car_name],
                        },
                };
        });

        const layout = {
                title: "Season Summary",
                xaxis: {
                        title: "Lap Time (seconds)",
                },
                yaxis: {
                        showticklabels: false,
                },
                hovermode: false,
                legend: {},
        };

        const darkModeLayout = {
                ...layout,
                plot_bgcolor: "#1e1e1f",
                paper_bgcolor: "#1e1e1f",
                xaxis: {
                        ...layout.xaxis,
                        gridcolor: "rgba(80, 80, 80, 1)",
                        tickfont: {
                                color: "rgba(200, 200, 200, 1)",
                        },
                        titlefont: {
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
                                color: "rgba(200, 200, 200, 1)", // Replace with your desired color
                        },
                        orientation: window.innerWidth < 800 ? "h" : "v",
                        x: window.innerWidth < 800 ? 0 : layout.legend.x, // this seems to adjust the width of chart on mobile
                        y: window.innerWidth < 800 ? -0.4 : layout.legend.y,
                        // xanchor: "center",
                        // yanchor: "top",
                },
                width: window.innerWidth > 800 ? 1000 : window.innerWidth,
                height: 500, // Adjust this value for the desired height
                margin: window.innerWidth > 800 ? { l: 40, r: 40, t: 60, b: 100 } : { l: 10, r: 0, t: 90, b: 240 },
                autosize: false,
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
                                        <h3 className="date-text">Last Updated: 6/2/2023</h3>
                                </div>
                                <div className="disclaimer-text-bpc">
                                        *Box plots display the full range of the data in an attempt to recitfy issues such as uneven distribution of more skilled drivers, but should not be the only
                                        metric in your research.{" "}
                                </div>
                                <div className="box-plot-container">
                                        <Plot data={data} layout={darkModeLayout} />
                                </div>
                                <div className="footer-text-chart-page">Calculated using best race lap times.</div>
                        </div>
                );
        }
};
