import React, { useEffect, useState } from "react";
import Plotly from "react-plotly.js";
import "../styles/IncidentsPerClub.css";

export const IncidentsPerClub = () => {
        const [data, setData] = useState([]);
        const [page, setPage] = useState(0);
        const [isLoading, setIsLoading] = useState(true);
        const [isMobile, setIsMobile] = useState(window.innerWidth <= 760);
        const [pageSize, setPageSize] = useState(isMobile ? 5 : 8);
        const [dataType, setDataType] = useState("road"); // Add this line

        // Helper function goes here
        const capitalizeFirstLetter = (string) => {
                return string.charAt(0).toUpperCase() + string.slice(1);
        };

        useEffect(() => {
                const handleResize = () => {
                        const currentIsMobile = window.innerWidth <= 760;
                        setIsMobile(currentIsMobile);
                        setPageSize(currentIsMobile ? 5 : 10);
                };

                window.addEventListener("resize", handleResize);

                return () => {
                        window.removeEventListener("resize", handleResize);
                };
        }, []);

        useEffect(() => {
                setIsLoading(true); // Add this line
                fetch(`https://iracing6-backend.herokuapp.com/api/average-incidents-per-club/${dataType}`)
                        .then((response) => response.json())
                        .then((data) => {
                                if (data) {
                                        const sortedData = data.filter((item) => item._id !== null).sort((a, b) => b.avg_incidents - a.avg_incidents);
                                        setData(sortedData);
                                        setIsLoading(false);
                                }
                        })
                        .catch((error) => console.log(error));
        }, [dataType]); // Update this line

        const paginatedData = data.slice(page * pageSize, (page + 1) * pageSize);

        const clubNames = paginatedData.map((item) => item._id);
        const avgIncidents = paginatedData.map((item) => item.avg_incidents);

        if (isLoading) {
                return (
                        <div>
                                <div className="spinner"></div>
                                <div className="loading-text-div">Loading data...</div>
                                <div className="smol-bottom-text-ird"></div>
                        </div>
                );
        }

        return (
                <div>
                        <div className="data-type-buttons">
                                {" "}
                                {/* Add these lines */}
                                <button className="incpc-cat-button-le" onClick={() => setDataType("road")}>
                                        Road
                                </button>
                                <button className="incpc-cat-button" onClick={() => setDataType("oval")}>
                                        Oval
                                </button>
                                <button className="incpc-cat-button" onClick={() => setDataType("dirt-road")}>
                                        Dirt Road
                                </button>
                                <button className="incpc-cat-button-re" onClick={() => setDataType("dirt-oval")}>
                                        Dirt Oval
                                </button>
                        </div>
                        <div className="smol-space-div"></div>
                        <Plotly
                                data={[
                                        {
                                                type: "bar",
                                                x: clubNames,
                                                y: avgIncidents,
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
                                        margin: isMobile ? { l: 30, r: 70, t: 90, b: 140 } : { l: 80, r: 100, t: 90, b: 140 },
                                        width: isMobile ? window.innerWidth : window.innerWidth - window.innerWidth * 0.3,
                                        height: 650,
                                        title: "Avg iRating by Club",
                                        plot_bgcolor: "#29272b",
                                        paper_bgcolor: "#29272b",
                                        title: `Avg incidents/race by Club (${capitalizeFirstLetter(dataType)})`, // Use the helper function here
                                        font: {
                                                color: "#dddddd",
                                                size: isMobile ? 10 : 12,
                                        },
                                        yaxis: {
                                                gridcolor: "darkgrey",
                                        },
                                        xaxis: {
                                                gridcolor: "darkgrey",
                                        },
                                }}
                                config={isMobile ? { displayModeBar: false } : {}}
                        />
                        <div className="irpc-button-container">
                                <button onClick={() => setPage(page - 1)} style={{ visibility: page === 0 ? "hidden" : "visible" }} className="irpc-prev-button">
                                        ← Previous
                                </button>
                                <button onClick={() => setPage(page + 1)} style={{ visibility: clubNames.length < pageSize ? "hidden" : "visible" }} className="irpc-next-button">
                                        Next →
                                </button>
                        </div>
                        <div className="disclaimer-text-bpc">Using data from users' career stats.</div>
                </div>
        );
};
