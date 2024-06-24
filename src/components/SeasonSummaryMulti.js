import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import "../styles/SeasonSummaryMulti.scss";

export const SeasonSummaryMulti = () => {
        const [isLoading, setIsLoading] = useState(true);
        const [carData, setCarData] = useState([]);

        useEffect(() => {
                const fetchData = async () => {
                        setIsLoading(true);
                        const response = await fetch("https://iracing6-backend.herokuapp.com/api/times-by-car/");
                        const jsonData = await response.json();
                        setCarData(jsonData);
                        setIsLoading(false);
                };
                fetchData();
        }, []);

        const seasonCarCounts = carData.reduce((counts, car) => {
                counts[car.season_name] = counts[car.season_name] || {};
                counts[car.season_name][car.car_name] = (counts[car.season_name][car.car_name] || 0) + car.race_best.length;
                return counts;
        }, {});

        const carColors = {
                "Audi R8 LMS GT3": "rgb(151, 151, 151)",
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
                "Porsche 963 GTP": "rgb(177, 43, 40)",
                "Mercedes-AMG GT4": "rgb(56, 144, 144)",
                "Aston Martin Vantage GT4": "rgb(11, 94, 11)",
                "BMW M Hybrid V8": "rgb(0, 73, 124)",
                "Dallara P217": "rgb(121, 50, 175)",
                "Hyundai Elantra N TC": "rgb(0, 46, 106)",
                "Audi RS 3 LMS": "rgb(151, 151, 151)",
                "Hyundai Veloster N TC": "rgb(40, 54, 162)",
                "Honda Civic Type R": "rgb(163, 0, 0)",
                "Cadillac V-Series.R GTP": "rgb(203, 165, 41)",
                "Acura ARX-06 GTP": "rgb(155, 155, 155)",
                "Ligier JS P320": "#4f72a8",
                "Toyota GR86": "#EB0A1E",
                "Global Mazda MX-5 Cup": "rgb(0, 73, 124)",
                "Ford Mustang FR500S": "rgb(0, 46, 106)",
                "Renault Clio": "rgb(188, 156, 0)",
                "Porsche 911 RSR": "#b08d57",
                "Chevrolet Corvette C8.R GTE": "rgb(100, 100, 100)",
                "BMW M8 GTE": "rgb(0, 123, 174)",
                "Ferrari 488 GTE": "rgb(176, 16, 48)",
                "Ford GTE": "rgb(48, 62, 137)",
                "Ford Mustang GT3": "rgb(0,0,205)",
        };

        //removing Season 3 data for now
        const filteredSeasonCarCounts = Object.entries(seasonCarCounts).filter(([season, cars]) => season !== "GT Sprint VRS Series - 2023 Season 3");

        const sortedSeasons = filteredSeasonCarCounts
                .map(([season, cars]) => {
                        const sortedCars = Object.entries(cars).sort((a, b) => b[1] - a[1]);
                        return [season, sortedCars];
                })
                .sort((a, b) => b[1][0][1] - a[1][0][1]);

        if (isLoading) {
                return (
                        <div>
                                <div className="spinner"></div>
                                <div className="loading-text-div-bpc">Loading data...</div>
                        </div>
                );
        } else {
                return (
                        <div>
                                <div className="ssm-title-div">2023 season 4</div>
                                <div className="season-summary-graph-container">
                                        {sortedSeasons.map(([season, cars], index) => (
                                                <div key={index}>
                                                        <Plot
                                                                data={[
                                                                        {
                                                                                type: "pie",
                                                                                labels: cars.map(([car, count]) => `${car} (${count})`), // Modified this line
                                                                                values: cars.map(([_, count]) => count),
                                                                                opacity: 0.8,
                                                                                marker: {
                                                                                        colors: cars.map(([car, _]) => carColors[car] || "grey"),
                                                                                        line: {
                                                                                                color: "rgba(255, 255, 255, 0.3)", // Outline color
                                                                                                width: 2, // Outline width
                                                                                                radius: 70, // Outline radius, percentage of the pie radius
                                                                                        },
                                                                                },
                                                                                textfont: {
                                                                                        color: "white",
                                                                                },
                                                                        },
                                                                ]}
                                                                layout={{
                                                                        legend: {
                                                                                font: {
                                                                                        color: "rgba(200, 200, 200, 1)", // Replace with your desired color
                                                                                },
                                                                                orientation: window.innerWidth < 800 ? "h" : "v",
                                                                                x: window.innerWidth < 800 ? 0.1 : {}, // this seems to adjust the width of chart on mobile
                                                                                y: window.innerWidth < 800 ? -0.4 : {},
                                                                                // xanchor: "center",
                                                                                // yanchor: "top",
                                                                        },
                                                                        title: `${season}`,

                                                                        plot_bgcolor: "#1e1e1f",
                                                                        paper_bgcolor: "#1e1e1f",
                                                                        font: {
                                                                                color: "rgba(200, 200, 200, 1)",
                                                                        },
                                                                        width: window.innerWidth > 800 ? 800 : window.innerWidth,
                                                                        height: window.innerWidth > 800 ? 600 : window.innerWidth,
                                                                        margin: window.innerWidth > 800 ? { l: 40, r: 40, t: 60, b: 60 } : { l: 0, r: 0, t: 90, b: 240 },
                                                                }}
                                                        />
                                                </div>
                                        ))}
                                </div>
                        </div>
                );
        }
};
