import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/HomePage.css";
import ui_id_img from "../assets/ui_id.png";
import url_id_img from "../assets/url_id.png";
import site_logo from "../assets/site_logo.png";
import DigitalPatreonLogo from "../assets/Digital-Patreon-Wordmark_White.png";
import bell_curve_function_light from "../assets/bell_curve_function_light.png";
import car_crash_icon_light from "../assets/car_crash_icon_light.png";
import chart_bar_horizontal_icon_light from "../assets/chart_bar_horizontal_icon_light.png";
import flag_icon_light from "../assets/flag_icon_light.png";
import flag_rect_light from "../assets/flag_rect_light.png";
import stopwatch_light from "../assets/stopwatch_light.png";
import { getIconFileName } from "../utils/iconUtils";

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

export const HomePage = () => {
        const [isModalOpen, setModalOpen] = useState(false);
        const [cust_id, setCustId] = useState("");
        const navigate = useNavigate();
        const [recentSessionsLoading, setRecentSessionsLoading] = useState(true);
        const [recentSessions, setRecentSessions] = useState([]);
        const [timeSinceArray, setTimeSinceArray] = useState([]);

        // fetch the 3 most recent sessions
        useEffect(() => {
                const fetchRecentSessions = async () => {
                        try {
                                const response = await axios.get(`https://iracing6-backend.herokuapp.com/api/sessionData/resultsrecent?limit=50`);
                                setRecentSessions(response.data);
                                setRecentSessionsLoading(false);
                        } catch (error) {
                                console.error("Error fetching recent sessions:", error);
                        }
                };
                fetchRecentSessions();
        }, []);

        // Calculate time since the session started
        useEffect(() => {
                if (recentSessions.length > 0) {
                        const calculateTimeSince = (startTime) => {
                                const start = new Date(startTime).getTime();
                                const now = Date.now();
                                const differenceInMinutes = Math.floor((now - start) / 60000);
                                return differenceInMinutes;
                        };

                        const timeSinceArray = recentSessions.map((session) => calculateTimeSince(session.start_time));
                        setTimeSinceArray(timeSinceArray);
                }
        }, [recentSessions]);

        const handleModalOpen = () => {
                setModalOpen(true);
        };

        const handleModalClose = () => {
                setModalOpen(false);
        };

        const handleInputChange = (event) => {
                setCustId(event.target.value);
        };

        const handleRecentSessionLink = (x) => {
                navigate(`/RaceResults/${recentSessions[x]?.subsession_id}`);
        };

        const handleGoButtonClick = () => {
                if (cust_id.length >= 5 && !isNaN(cust_id) && cust_id.length <= 7) {
                        navigate(`/user/careerstats/${cust_id}`);
                } else {
                        alert("Please enter a valid 5 to 7 digit Customer ID.");
                }
        };

        const handleExamples = (cust_id) => {
                navigate(`/user/careerstats/${cust_id}`);
        };

        // Method to get the icon URL
        const getIconUrl = (seasonName) => {
                const iconName = getIconFileName(seasonName);
                // Assuming the icons are stored in the public folder under assets
                return `${process.env.PUBLIC_URL}/assets/series-icons/${iconName}.png`;
        };

        return (
                <div>
                        {/* <div className="homepage-banner">
                                <h1>Most Features are undergoing maintenance for the new season, and may not work.</h1>
                        </div> */}
                        <div className="homepage">
                                <div className="top-background-div">
                                        <img className="site_logo_img" src={site_logo} alt="iRacing Data Logo" />
                                        {/* <div className="top-separator-div"> </div> */}
                                </div>
                                <div className="homepage-square-organizing-cont-top">
                                        <div className="homepage-input-wrapper">
                                                <div className="home-top-title"> Career Stats </div>
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
                                                                        You can find your Customer ID in the desktop UI by clicking on your helmet icon in the top right corner, then clicking{" "}
                                                                        <b>Account</b>
                                                                </div>
                                                                <img className="ui_id_img" src={ui_id_img} alt="UI Customer ID location" />
                                                                <div className="modal-text">
                                                                        <b>Or</b>, if you use the iRacing Member Site, you can visit your Your Name page and view your Customer ID in the URL
                                                                </div>
                                                                <img className="ui_id_img" src={url_id_img} alt="UI Customer ID location" />
                                                        </Modal>
                                                        <div className="cs-examples-container">
                                                                {/* <h2>Just Looking?</h2> */}
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
                                        {/* // on click, link to https://www.patreon.com/iRacingData */}
                                        <div>
                                                <div className="homepage-patreon-sq">
                                                        <a href="https://www.patreon.com/iRacingData" target="_blank" rel="noopener noreferrer" className="patreon-square">
                                                                <div className="patreon-banner-text-l">
                                                                        <p>Support the site ad free for $1 per month</p>
                                                                </div>
                                                                <img className="patreon_logo_home" src={DigitalPatreonLogo} alt="Patreon Logo" />
                                                                <div className="patreon-subscriber-carousel">
                                                                        <div className="patreon-subscriber-carousel-text">
                                                                                <p>Thank you Patreons: Kjetil L, Ethan S, Sam H.</p>
                                                                        </div>
                                                                </div>
                                                        </a>
                                                </div>
                                        </div>
                                </div>
                                <div className="homepage-square-organizing-cont">
                                        <div className="homepage-square-organizing">
                                                <h2 className="home-charts-title">Series Stats</h2>
                                                <div className="button-container">
                                                        <Link to="/charts/SeriesPopularity" className="homepage-button">
                                                                <img
                                                                        src={chart_bar_horizontal_icon_light}
                                                                        alt="Bar Chart Icon"
                                                                        style={{ verticalAlign: "middle", marginRight: ".6rem", marginLeft: "-.5rem", height: "1.5rem" }}
                                                                />
                                                                Series Popularity
                                                        </Link>

                                                        <Link to="/charts/SeriesSafety" className="homepage-button">
                                                                <img
                                                                        src={car_crash_icon_light}
                                                                        alt="Bar Chart Icon"
                                                                        style={{ verticalAlign: "middle", marginRight: "1rem", marginLeft: "-1.4rem", height: "1.4rem" }}
                                                                />
                                                                Series Safety
                                                        </Link>
                                                        <Link to="/charts/SeriesLapTimeChart/" className="homepage-button">
                                                                <img
                                                                        src={stopwatch_light}
                                                                        alt="Bar Chart Icon"
                                                                        style={{ verticalAlign: "middle", marginRight: ".6rem", marginLeft: "-.5rem", height: "1.5rem" }}
                                                                />
                                                                Series Lap Times
                                                        </Link>
                                                </div>
                                        </div>
                                        <div className="homepage-square-organizing">
                                                <h2 className="home-charts-title-2">User Stats</h2>
                                                <div className="button-container">
                                                        <Link to="/charts/irating" className="homepage-button">
                                                                <img
                                                                        src={bell_curve_function_light}
                                                                        alt="Bar Chart Icon"
                                                                        style={{ verticalAlign: "middle", marginRight: ".6rem", marginLeft: "-.5rem", height: "1.5rem", marginBottom: ".5rem" }}
                                                                />
                                                                iRating Distribution
                                                        </Link>
                                                        <Link to="/charts/IRatingPerClub" className="homepage-button">
                                                                <img
                                                                        src={flag_icon_light}
                                                                        alt="Bar Chart Icon"
                                                                        style={{ verticalAlign: "middle", marginRight: ".6rem", marginLeft: "-.5rem", height: "1.5rem" }}
                                                                />
                                                                iRating per Club
                                                        </Link>
                                                        <Link to="/charts/IncidentsPerClub" className="homepage-button">
                                                                <img
                                                                        src={flag_rect_light}
                                                                        alt="Bar Chart Icon"
                                                                        style={{ verticalAlign: "middle", marginRight: ".6rem", marginLeft: "-.5rem", height: "1.5rem" }}
                                                                />
                                                                Incidents per Club
                                                        </Link>
                                                </div>
                                        </div>
                                        <div className="homepage-square-organizing">
                                                <h2 className="home-charts-title-rs">Recent Races</h2>
                                                {recentSessionsLoading ? (
                                                        <div className="homepage-recent-session-cont">Loading Recent Sessions...</div>
                                                ) : (
                                                        <div className="homepage-recent-session-cont">
                                                                {recentSessions.slice(0, 2).map((session, index) => (
                                                                        <div key={session.subsession_id} className="recent-session-tile" onClick={() => handleRecentSessionLink(index)}>
                                                                                <img
                                                                                        src={getIconUrl(session.season_name)}
                                                                                        style={{
                                                                                                marginRight: "0rem",
                                                                                                marginLeft: "0rem",
                                                                                                width: "2.9rem",
                                                                                                marginTop: "0rem",
                                                                                                marginBottom: "0rem",
                                                                                        }}
                                                                                />
                                                                                <div className="sof-and-time-cont">
                                                                                        <div className="sof-and-time-left">
                                                                                                <div className="recent-session-time">Started </div>
                                                                                                <div className="recent-session-sof">SoF </div>
                                                                                        </div>
                                                                                        <div className="sof-and-time-right">
                                                                                                <div className="recent-session-time">{timeSinceArray[index]} min ago</div>
                                                                                                <div className="recent-session-sof">{session.event_strength_of_field}</div>
                                                                                        </div>
                                                                                </div>
                                                                        </div>
                                                                ))}
                                                                <div className="recent-session-tile" onClick={() => handleRecentSessionLink()}>
                                                                        See More →
                                                                </div>
                                                        </div>
                                                )}
                                        </div>
                                </div>
                                <div className="homepage-square-organizing-cont">
                                        <div className="homepage-square-organizing-2">
                                                <h2 className="home-charts-title-mc">Multi-Car</h2>
                                                <div className="button-container-mc-2">
                                                        <Link to="/charts/VRS" className="homepage-button-mc">
                                                                <img
                                                                        src={getIconUrl("GT Sprint Simucube Series - 2024 Season 3")}
                                                                        style={{
                                                                                float: "left",
                                                                                marginRight: "1rem",
                                                                                marginLeft: "1rem",
                                                                                width: "3.9rem",
                                                                        }}
                                                                />
                                                        </Link>
                                                        <Link to="/charts/FanatecFixed" className="homepage-button-mc">
                                                                <img
                                                                        src={getIconUrl("GT3 Fanatec Challenge")}
                                                                        style={{
                                                                                float: "left",
                                                                                marginRight: "1rem",
                                                                                marginLeft: "1rem",
                                                                                width: "3.7rem",
                                                                        }}
                                                                />
                                                        </Link>
                                                        <Link to="/charts/IMSA" className="homepage-button-mc">
                                                                <img
                                                                        src={getIconUrl("IMSA iRacing Series - 2024 Season 3")}
                                                                        style={{
                                                                                float: "left",
                                                                                marginRight: "1rem",
                                                                                marginLeft: "1rem",
                                                                                width: "3.7rem",
                                                                        }}
                                                                />
                                                        </Link>
                                                        <Link to="/charts/IMSAFixed" className="homepage-button-mc">
                                                                <img
                                                                        src={getIconUrl("IMSA iRacing Series - Fixed - 2024 Season 3")}
                                                                        style={{
                                                                                float: "left",
                                                                                marginRight: "1rem",
                                                                                marginLeft: "1rem",
                                                                                width: "3.7rem",
                                                                        }}
                                                                />
                                                        </Link>
                                                        <Link to="/charts/IMSAEndurance" className="homepage-button-mc">
                                                                <img
                                                                        src={getIconUrl("IMSA Endurance Series")}
                                                                        style={{
                                                                                float: "left",
                                                                                marginRight: "1rem",
                                                                                marginLeft: "1rem",
                                                                                width: "3.4rem",
                                                                        }}
                                                                />
                                                        </Link>

                                                        <Link to="/charts/SCC" className="homepage-button-mc">
                                                                <img
                                                                        src={getIconUrl("Falken Tyre Sports Car Challenge - 2024 Season 3")}
                                                                        style={{
                                                                                float: "left",
                                                                                marginRight: "1rem",
                                                                                marginLeft: "1rem",
                                                                                width: "5rem",
                                                                        }}
                                                                />
                                                        </Link>
                                                        <Link to="/charts/GT4Fixed" className="homepage-button-mc">
                                                                <img
                                                                        src={getIconUrl("GT4 Falken Tyre Challenge - 2024 Season 3 Fixed")}
                                                                        style={{
                                                                                float: "left",
                                                                                marginRight: "1rem",
                                                                                marginLeft: "1rem",
                                                                                width: "3.4rem",
                                                                        }}
                                                                />
                                                        </Link>
                                                        <Link to="/charts/PCC" className="homepage-button-mc">
                                                                <img
                                                                        src={getIconUrl("Production Car Sim-Lab Challenge - 2024 Season 3")}
                                                                        style={{
                                                                                float: "left",
                                                                                marginRight: "1rem",
                                                                                marginLeft: "1rem",
                                                                                width: "4.1rem",
                                                                        }}
                                                                />
                                                        </Link>
                                                        <Link to="/charts/TCR" className="homepage-button-mc">
                                                                <img
                                                                        src={getIconUrl("TCR Virtual Challenge")}
                                                                        style={{
                                                                                float: "left",
                                                                                marginRight: "1rem",
                                                                                marginLeft: "1rem",
                                                                                width: "4.2rem",
                                                                        }}
                                                                />
                                                        </Link>
                                                        <Link to="/charts/TCRFixed" className="homepage-button-mc">
                                                                <img
                                                                        src={getIconUrl("TCR Virtual Challenge - Fixed")}
                                                                        style={{
                                                                                float: "left",
                                                                                marginRight: "1rem",
                                                                                marginLeft: "1rem",
                                                                                width: "4.2rem",
                                                                        }}
                                                                />
                                                        </Link>

                                                        {/* <Link to="/charts/WRC" className="homepage-button-mc">
                                                                <img
                                                                        src={getIconUrl("Weekly")}
                                                                        style={{
                                                                                float: "left",
                                                                                marginRight: "1rem",
                                                                                marginLeft: "1rem",
                                                                                width: "3.6rem",
                                                                        }}
                                                                />
                                                        </Link> */}
                                                        {/* <Link to="/charts/SeasonSummaryMulti" className="homepage-button">
                                                Season Summary
                                        </Link> */}
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
        );
};
