import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import "../styles/IRatingPerClub.css";

const IRatingPerClub = () => {
        const [clubs, setClubs] = useState([]);
        const [page, setPage] = useState(0);
        const [isLoading, setIsLoading] = useState(true);
        const [isMobile, setIsMobile] = useState(window.innerWidth <= 760);
        const [pageSize, setPageSize] = useState(isMobile ? 5 : 10);

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
                fetch("https://iracing6-backend.herokuapp.com/api/average-irating-per-club/")
                        .then((response) => response.json())
                        .then((data) => {
                                const clubsArray = Object.entries(data)
                                        .filter(([club, rating]) => rating !== null)
                                        .sort((a, b) => b[1] - a[1]);

                                setClubs(clubsArray);
                                setIsLoading(false);
                        })
                        .catch((error) => {
                                console.error("Error:", error);
                                setIsLoading(false);
                        });
        }, []);

        const currentClubs = clubs.slice(page * pageSize, (page + 1) * pageSize);

        const data = [
                {
                        x: currentClubs.map((item) => item[0]),
                        y: currentClubs.map((item) => item[1]),
                        type: "bar",
                        marker: {
                                color: "rgba(241, 196, 15, 0.7)",
                        },
                        hovertemplate: "%{y:.0f}<extra></extra>", // Remove the decimals text from the hover
                },
        ];

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
                        <div className="smol-space-div"></div>
                        <Plot
                                data={data}
                                layout={{
                                        margin: isMobile ? { l: 40, r: 40, t: 90, b: 140 } : { l: 80, r: 100, t: 90, b: 140 },
                                        width: isMobile ? window.innerWidth : window.innerWidth - window.innerWidth * 0.3,
                                        height: 650,
                                        title: "Avg iRating by Club",
                                        plot_bgcolor: "#29272b",
                                        paper_bgcolor: "#29272b",
                                        font: {
                                                color: "white",
                                        },
                                        yaxis: {
                                                gridcolor: "darkgrey",
                                        },
                                        xaxis: {
                                                gridcolor: "darkgrey",
                                        },
                                }}
                        />
                        <div className="irpc-button-container">
                                <button onClick={() => setPage(page - 1)} style={{ visibility: page === 0 ? "hidden" : "visible" }} className="irpc-prev-button">
                                        ← Previous
                                </button>
                                <button onClick={() => setPage(page + 1)} style={{ visibility: currentClubs.length < pageSize ? "hidden" : "visible" }} className="irpc-next-button">
                                        Next →
                                </button>
                        </div>
                </div>
        );
};

export default IRatingPerClub;
