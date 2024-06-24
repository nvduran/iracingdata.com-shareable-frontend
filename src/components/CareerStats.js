import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "../styles/CareerStats.css";
import ui_id_img from "../assets/ui_id.png";
import url_id_img from "../assets/url_id.png";
import { useNavigate } from "react-router-dom";
import moment from "moment";

function CareerStats() {
        const { custid } = useParams();
        const [data, setData] = useState(null);
        const [error, setError] = useState(null);
        const [Category, setCategory] = useState("road");
        const [percentilesData, setPercentilesData] = useState(null);
        const [shouldRetry, setShouldRetry] = useState(false); // New state to track if we should retry
        const [isModalOpen, setModalOpen] = useState(false);
        const [cust_id, setCustId] = useState("");
        const navigate = useNavigate();

        const handleModalOpen = () => {
                setModalOpen(true);
        };

        const handleModalClose = () => {
                setModalOpen(false);
        };

        const handleInputChange = (event) => {
                setCustId(event.target.value);
        };

        const handleGoButtonClick = () => {
                if (cust_id.length >= 4 && !isNaN(cust_id)) {
                        navigate(`/user/careerstats/${cust_id}`);
                } else {
                        alert("Please enter a valid 6-digit Customer ID");
                }
        };

        const handleExamples = (cust_id) => {
                navigate(`/user/careerstats/${cust_id}`);
        };

        async function requestCustUpdate(cust_id) {
                try {
                        const response = await fetch(`https://iracing6-backend.herokuapp.com/api/member-career-stats/rescan/${cust_id}`, {
                                method: "POST",
                                headers: {
                                        "Content-Type": "application/json",
                                },
                        });

                        const data = await response.json();

                        if (response.status === 200) {
                                return data;
                        } else {
                                console.error(data.error);
                                throw new Error(data.error);
                        }
                } catch (error) {
                        console.error("Error requesting cust update:", error);
                        throw error;
                }
        }

        const handleRequestUpdate = async () => {
                try {
                        const response = await requestCustUpdate(custid);
                        if (response && response.message) {
                                // Trigger the fetch again to refresh the displayed data
                                setShouldRetry(true);
                        }
                } catch (error) {
                        // Handle any errors from the requestCustUpdate function
                        alert("Error updating data: " + error.message);
                }
        };

        let lastUpdatedRelativeTime = "Loading..."; // Default text or whatever you prefer
        if (data) {
                lastUpdatedRelativeTime = moment(data.last_update).fromNow();
        }

        const retryTimeoutRef = useRef(null); // Ref to store the timeout

        const Modal = ({ isOpen, onClose, children }) => {
                if (!isOpen) return null;

                return (
                        <div className="modal-overlay">
                                <div className="modal-content">
                                        {children}
                                        <button className="modal_close_button" onClick={onClose}>
                                                Close
                                        </button>
                                </div>
                        </div>
                );
        };

        // Fetch career stats data
        useEffect(() => {
                if (custid) {
                        fetch(`https://iracing6-backend.herokuapp.com/api/member-career-stats/career/${custid}`)
                                .then((response) => {
                                        if (!response.ok) {
                                                if (response.status === 500 || response.status === 202) {
                                                        throw new Error("You have been added to the queue to be scanned.");
                                                }
                                                throw new Error("Something went wrong.");
                                        }
                                        return response.json();
                                })
                                .then((data) => {
                                        setData(data);
                                        console.log(data);
                                        setError(null); // Clear the error state
                                        setShouldRetry(false); // Reset shouldRetry to false
                                })
                                .catch((err) => {
                                        setError(err.message);
                                        if (err) {
                                                if (!shouldRetry) {
                                                        setShouldRetry(true);
                                                }
                                        }
                                });
                }

                return () => {
                        clearTimeout(retryTimeoutRef.current); // Clear the timeout when the component is unmounted or before starting a new fetch
                };
        }, [custid, shouldRetry]);

        // Handle retry mechanism
        useEffect(() => {
                if (shouldRetry) {
                        retryTimeoutRef.current = setTimeout(() => {
                                setShouldRetry(false); // Reset shouldRetry to trigger the fetch again
                        }, 15000); // Retry after 15 seconds
                }

                return () => {
                        clearTimeout(retryTimeoutRef.current); // Clear the timeout when the component is unmounted
                };
        }, [shouldRetry]);

        // Fetch percentiles data
        useEffect(() => {
                setPercentilesData(null);
                fetch(`https://iracing6-backend.herokuapp.com/api/user-career-stats-percentiles/?field=wins,starts,laps,laps_led,laps_led_percentage,starts_per_win,avg_incidents&category=${Category}`)
                        .then((response) => response.json())
                        .then((data) => {
                                setPercentilesData(data[Category]);
                        })
                        .catch((error) => console.error("Error fetching percentiles:", error));
        }, [Category]);

        const calculatePercentile = (userValue, sortedData) => {
                const rank = sortedData.filter((val) => val <= userValue).length;
                return (rank / sortedData.length) * 100;
        };

        const calculatePercentileForLowerIsBetter = (userValue, sortedData) => {
                const rank = sortedData.filter((val) => val >= userValue).length;
                return (rank / sortedData.length) * 100;
        };

        // DISABLED TEMPORARILY
        const getRanking = (value, leaderboard) => {
                for (let i = 0; i < leaderboard.length; i++) {
                        if (value >= leaderboard[i]) {
                                // return i + 1; // zero-based indexing to 1-based ranking
                        }
                }
                // return leaderboard.length + 1; // if user's value is the lowest
        };

        if (error === "You have been added to the queue to be scanned.") {
                return (
                        <div className="cs_queue_container_div_meta">
                                <div className="cs_queue_container_div">
                                        <div className="queue_title">We don't have this user in our database.</div>
                                        <div>You have been queued for a scan.</div>
                                        <div className="min_warn">This can take up to 2 minutes</div>
                                </div>
                                <div className="cs_queue_container_div_dw">
                                        <p>This page will refresh automatically</p>
                                </div>
                                <div className="spinner"></div>
                        </div>
                );
        }

        // Add error check here:
        if (error) {
                return (
                        <div className="whitetext">
                                <h1>Error</h1>
                                <p>{error}</p>
                                <p>Please email me at contact@iracingdata.com with this error message. Thank you.</p>
                        </div>
                );
        }

        if (!custid) {
                return (
                        <div className="no_cust_id_container">
                                <div className="top-background-div">
                                        <div className="top-background-text-cs">Career Stats</div>
                                        <div className="cust_id_input_div">
                                                <div className="input-container-row">
                                                        <input
                                                                className="cust_id_input"
                                                                type="text"
                                                                placeholder="iRacing Customer ID"
                                                                name="cust_id"
                                                                value={cust_id}
                                                                onChange={handleInputChange}
                                                                pattern="^\d{6}$"
                                                                title="Please enter a 6-digit Customer ID"
                                                        />

                                                        <div className="button-go" onClick={handleGoButtonClick}>
                                                                {" "}
                                                                →{" "}
                                                        </div>
                                                </div>
                                                <p onClick={handleModalOpen}>Where do I find my customer ID?</p>
                                                <Modal isOpen={isModalOpen} onClose={handleModalClose}>
                                                        <div className="modal-text">
                                                                You can find your Customer ID in the desktop UI by clicking on your helmet icon in the top right corner, then clicking <b>Your Name</b>
                                                        </div>
                                                        <img className="ui_id_img" src={ui_id_img} alt="UI Customer ID location" />
                                                        <div className="modal-text">
                                                                <b>Or</b>, if you use the iRacing Member Site, you can visit your Your Name page and view your Customer ID in the URL
                                                        </div>
                                                        <img className="ui_id_img" src={url_id_img} alt="UI Customer ID location" />
                                                </Modal>
                                                <div className="cs-examples-container">
                                                        <h2>Just Looking?</h2>
                                                        <div className="example_users_container">
                                                                <div className="example_users_text" onClick={() => handleExamples(168966)}>
                                                                        <p>
                                                                                <i>
                                                                                        M. Verstappen <br /> 168966
                                                                                </i>
                                                                        </p>
                                                                </div>
                                                                <div className="example_users_text" onClick={() => handleExamples(95469)}>
                                                                        <p>
                                                                                <i>
                                                                                        J. Broadbent <br /> 95469
                                                                                </i>
                                                                        </p>
                                                                </div>
                                                                <div className="example_users_text" onClick={() => handleExamples(370235)}>
                                                                        <p>
                                                                                <i>
                                                                                        D. Earnhardt Jr <br /> 370235
                                                                                </i>
                                                                        </p>
                                                                </div>
                                                                <div className="example_users_text" onClick={() => handleExamples(444212)}>
                                                                        <p>
                                                                                <i>
                                                                                        T. Kanaan <br /> 444212
                                                                                </i>
                                                                        </p>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                );
        }

        if (!data) {
                return <div className="spinner"></div>;
        }

        if (data.display_name) {
                return (
                        <div className="career_stats_container">
                                <div className="cs_title_hero">Career Stats</div>
                                <div className="cs_career_section_container">
                                        <div className="big_user_box_cs">
                                                <div className="cs_user_name_div">{data.display_name}</div>
                                                <div className="cs_user_id_div">#{custid}</div>
                                        </div>

                                        <div className="cs_career_stats_row_container">
                                                <div className="cs_career_stats_row_top">
                                                        {data.formula_car && data.formula_car.iRating ? (
                                                                <div className="cs_career_stats_row_cat_box">
                                                                        <div className="cs_career_stats_row_title">Formula</div>
                                                                        <div className="cs_career_stats_row_value">{data.formula_car.iRating.value}</div>
                                                                </div>
                                                        ) : null}
                                                        {data.sports_car && data.sports_car.iRating ? (
                                                                <div className="cs_career_stats_row_cat_box">
                                                                        <div className="cs_career_stats_row_title">Sports Car</div>
                                                                        <div className="cs_career_stats_row_value">{data.sports_car.iRating.value}</div>
                                                                </div>
                                                        ) : null}
                                                        {!data.formula_car ? (
                                                                <div className="cs_career_stats_row_cat_box">
                                                                        <div className="cs_career_stats_row_title">Road</div>
                                                                        <div className="cs_career_stats_row_value">{data.road.iRating.value}</div>
                                                                </div>
                                                        ) : null}
                                                        <div className="cs_career_stats_row_cat_box">
                                                                <div className="cs_career_stats_row_title">Oval</div>
                                                                <div className="cs_career_stats_row_value">{data.oval.iRating.value}</div>
                                                        </div>
                                                </div>
                                                <div className="cs_career_stats_row_bottom">
                                                        <div className="cs_career_stats_row_cat_box">
                                                                <div className="cs_career_stats_row_title">Dirt Road</div>
                                                                <div className="cs_career_stats_row_value">{data.dirt_road && data.dirt_road.iRating ? data.dirt_road.iRating.value : 0}</div>
                                                        </div>
                                                        <div className="cs_career_stats_row_cat_box">
                                                                <div className="cs_career_stats_row_title">Dirt Oval</div>
                                                                <div className="cs_career_stats_row_value">{data.dirt_oval && data.dirt_oval.iRating ? data.dirt_oval.iRating.value : 0}</div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                                <div className="top-separator-div-cs"> </div>
                                <div className="chart-cat-buttons-cs-container">
                                        <button className={`chart-cat-buttons-cs-div-le ${Category === "road" ? "active-category" : ""}`} onClick={() => setCategory("road")}>
                                                Road
                                        </button>
                                        <button className={`chart-cat-buttons-cs-div ${Category === "sports_car" ? "active-category" : ""}`} onClick={() => setCategory("sports_car")}>
                                                Sports Car
                                        </button>
                                        <button className={`chart-cat-buttons-cs-div ${Category === "formula_car" ? "active-category" : ""}`} onClick={() => setCategory("formula_car")}>
                                                Formula
                                        </button>
                                        <button className={`chart-cat-buttons-cs-div ${Category === "oval" ? "active-category" : ""}`} onClick={() => setCategory("oval")}>
                                                Oval
                                        </button>
                                        <button className={`chart-cat-buttons-cs-div ${Category === "dirt_road" ? "active-category" : ""}`} onClick={() => setCategory("dirt_road")}>
                                                Dirt Road
                                        </button>
                                        <button className={`chart-cat-buttons-cs-div-re ${Category === "dirt_oval" ? "active-category" : ""}`} onClick={() => setCategory("dirt_oval")}>
                                                Dirt Oval
                                        </button>
                                </div>
                                <div className="cs_category_section_container">
                                        <div className="cs_category_stats_row">
                                                <StatBox title="iRating starts" value={data[Category].starts} percentileData={percentilesData?.starts} />
                                                <StatBox title="Wins" value={data[Category].wins} percentileData={percentilesData?.wins} />
                                                <StatBox
                                                        title="Starts per Win"
                                                        value={(data[Category].starts / data[Category].wins).toFixed(2)}
                                                        percentileData={percentilesData?.starts_per_win}
                                                        isLowerBetter
                                                />
                                                {/* <StatBox title="Laps" value={data[Category].laps} percentileData={percentilesData?.laps} /> */}
                                        </div>
                                        <div className="cs_category_stats_row">
                                                <StatBox title="Laps Led" value={data[Category].laps_led} percentileData={percentilesData?.laps_led} />
                                                <StatBox title="Laps Led Percentage" value={data[Category].laps_led_percentage} percentileData={percentilesData?.laps_led_percentage} />
                                                <StatBox title="Avg Incidents" value={data[Category].avg_incidents.toFixed(2)} percentileData={percentilesData?.avg_incidents} isLowerBetter />
                                        </div>
                                </div>
                                <div className="cs_small_stats_container">
                                        <div className="cs_small_stats_box">
                                                <div className="cs_small_stats_title">Total Laps</div>
                                                <div className="cs_small_stats_value">{data[Category].laps}</div>
                                        </div>
                                        <div className="cs_small_stats_box">
                                                <div className="cs_small_stats_title">Poles</div>
                                                <div className="cs_small_stats_value">{data[Category].poles}</div>
                                        </div>
                                        <div className="cs_small_stats_box">
                                                <div className="cs_small_stats_title">Top 5s</div>
                                                <div className="cs_small_stats_value">{data[Category].top5}</div>
                                        </div>
                                </div>
                                <div className="cs_last_updated_container">
                                        <div className="cs_last_updated_text">Last updated: {lastUpdatedRelativeTime}</div>
                                        <div className="cs_last_updated_request" onClick={handleRequestUpdate}>
                                                Request Update
                                        </div>
                                </div>
                        </div>
                );

                function StatBox({ title, value, percentileData, isLowerBetter = false }) {
                        const getPercentileColor = (percentile) => {
                                if (percentile <= 49) return "#6e6e6ee8";
                                if (percentile <= 74) return "#15a108e8";
                                if (percentile <= 89) return "#13498fe8";
                                if (percentile <= 99) return "#8f0edae8";
                                return "#eb7c14da";
                        };

                        const getTopPercentile = (percentile) => {
                                return 100 - percentile;
                        };

                        const { percentiles, leaderboard } = percentileData || {};
                        let percentileValue = "Loading...";
                        let color = "grey"; // default color for when data is loading
                        let ranking;
                        let topPercentile;

                        if (percentileData) {
                                const calculatedPercentile = isLowerBetter ? calculatePercentileForLowerIsBetter(value, percentiles) : calculatePercentile(value, percentiles);
                                topPercentile = getTopPercentile(calculatedPercentile).toFixed(0); // New line to calculate "top x %" value

                                if (calculatedPercentile > 98 && leaderboard) {
                                        // If the user is at the 100th percentile, find their rank on the leaderboard
                                        ranking = getRanking(value, leaderboard);
                                }

                                percentileValue = `Top ${topPercentile}%`; // Change to display "Top x %"
                                color = getPercentileColor(calculatedPercentile);
                        }

                        return (
                                <div className="cs_category_stats_statbox">
                                        <div className="cs_category_stats_statbox_title">{title}</div>
                                        <div className="cs_category_stats_statbox_value">{value}</div>
                                        <div className="cs_cat_perc_box" style={{ backgroundColor: color }}>
                                                {ranking ? (
                                                        <div className="cs_category_stats_statbox_ranking">Rank: {ranking}</div>
                                                ) : (
                                                        <div className="cs_category_stats_statbox_percvalue">{percentileValue}</div>
                                                )}
                                        </div>
                                </div>
                        );
                }
        } else {
                handleRequestUpdate();
                return (
                        <div className="cs_queue_container_div_meta">
                                <div className="cs_queue_container_div">
                                        <div className="queue_title">We don't have this user in our database.</div>
                                        <div>You have been queued for a scan.</div>
                                        <div className="min_warn">This can take up to 2 minutes</div>
                                </div>
                                <div className="cs_queue_container_div_dw">
                                        <p>This page will automatically refresh</p>
                                </div>
                                <div className="spinner"></div>
                        </div>
                );
        }
}

export default CareerStats;
