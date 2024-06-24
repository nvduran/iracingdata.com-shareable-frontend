import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import site_logo from "../assets/site_logo.png";
import nav_user_icon from "../assets/nav-user-icon.png";
import "../styles/TopNav.css";

export const TopNav = ({ isLoggedIn, setIsLoggedIn }) => {
        let navigate = useNavigate();

        const checkLoginStatus = () => {
                const token = localStorage.getItem("token");
                setIsLoggedIn(!!token);
        };

        useEffect(() => {
                // Check login status when the component mounts
                checkLoginStatus();

                // Add an event listener for the storage event
                window.addEventListener("storage", checkLoginStatus);

                // Cleanup the event listener when the component unmounts
                return () => {
                        window.removeEventListener("storage", checkLoginStatus);
                };
        }, []);

        const handleLogout = () => {
                localStorage.removeItem("token");
                localStorage.removeItem("username");
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("isPaidUser");
                setIsLoggedIn(false);
                navigate("/login");
        };

        return (
                <Navbar expand="lg" className="topnavcontainer" variant="dark">
                        <div onClick={() => navigate("/")} className="topnavbrand">
                                <img src={site_logo} alt="iRacing6 Logo" className="topnavlogo" />
                        </div>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggler" />

                        <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto">
                                        <LinkContainer to="/user/careerstats">
                                                <Nav.Link>Career Stats</Nav.Link>
                                        </LinkContainer>
                                        <LinkContainer to="/RaceResults/recent">
                                                <Nav.Link>Race Results</Nav.Link>
                                        </LinkContainer>
                                        <NavDropdown title="Series Stats" id="basic-nav-dropdown">
                                                <LinkContainer to="/charts/SeriesPopularity">
                                                        <NavDropdown.Item>Series Popularity</NavDropdown.Item>
                                                </LinkContainer>
                                                <LinkContainer to="/charts/SeriesSafety">
                                                        <NavDropdown.Item>Series Safety</NavDropdown.Item>
                                                </LinkContainer>
                                                <LinkContainer to="/charts/SeriesLapTimeChart/">
                                                        <NavDropdown.Item>Series Lap Times</NavDropdown.Item>
                                                </LinkContainer>
                                        </NavDropdown>
                                        <NavDropdown title="User Stats" id="basic-nav-dropdown">
                                                <LinkContainer to="/charts/irating">
                                                        <NavDropdown.Item> iRatings </NavDropdown.Item>
                                                </LinkContainer>
                                                <LinkContainer to="/charts/IRatingPerClub">
                                                        <NavDropdown.Item> Avg iRating per Club</NavDropdown.Item>
                                                </LinkContainer>
                                                <LinkContainer to="/charts/IncidentsPerClub">
                                                        <NavDropdown.Item> Avg Incidents per Club</NavDropdown.Item>
                                                </LinkContainer>
                                        </NavDropdown>
                                        <NavDropdown title="Multi-Car Charts" id="basic-nav-dropdown">
                                                <LinkContainer to="/charts/VRS">
                                                        <NavDropdown.Item>GT Sprint</NavDropdown.Item>
                                                </LinkContainer>
                                                <LinkContainer to="/charts/FanatecFixed">
                                                        <NavDropdown.Item>GT3 Fixed</NavDropdown.Item>
                                                </LinkContainer>
                                                <LinkContainer to="/charts/IMSA">
                                                        <NavDropdown.Item>IMSA</NavDropdown.Item>
                                                </LinkContainer>
                                                <LinkContainer to="/charts/IMSAFixed">
                                                        <NavDropdown.Item>IMSA Fixed</NavDropdown.Item>
                                                </LinkContainer>
                                                <LinkContainer to="/charts/IMSAEndurance">
                                                        <NavDropdown.Item>IMSA Endurance</NavDropdown.Item>
                                                </LinkContainer>
                                                <LinkContainer to="/charts/SCC">
                                                        <NavDropdown.Item>Sports Car Challenge</NavDropdown.Item>
                                                </LinkContainer>
                                                <LinkContainer to="/charts/GT4Fixed">
                                                        <NavDropdown.Item>GT4 Fixed</NavDropdown.Item>
                                                </LinkContainer>
                                                <LinkContainer to="/charts/TCR">
                                                        <NavDropdown.Item>TCR</NavDropdown.Item>
                                                </LinkContainer>
                                                <LinkContainer to="/charts/TCRFixed">
                                                        <NavDropdown.Item>TCR Fixed</NavDropdown.Item>
                                                </LinkContainer>
                                                <LinkContainer to="/charts/PCC">
                                                        <NavDropdown.Item>Production Car Challenge</NavDropdown.Item>
                                                </LinkContainer>
                                                <LinkContainer to="/charts/WRC">
                                                        <NavDropdown.Item>Weekly Race Challenge</NavDropdown.Item>
                                                </LinkContainer>
                                                <LinkContainer to="/charts/SeasonSummaryMulti">
                                                        <NavDropdown.Item>Summary</NavDropdown.Item>
                                                </LinkContainer>
                                        </NavDropdown>
                                        <NavDropdown title="About" id="basic-nav-dropdown">
                                                <LinkContainer to="/about/PrivacyPolicy">
                                                        <NavDropdown.Item>Privacy Policy</NavDropdown.Item>
                                                </LinkContainer>
                                                <LinkContainer to="/about/Contact">
                                                        <NavDropdown.Item>Contact Me</NavDropdown.Item>
                                                </LinkContainer>
                                        </NavDropdown>
                                        <LinkContainer to="/support">
                                                <Nav.Link>Support The Site</Nav.Link>
                                        </LinkContainer>
                                        {isLoggedIn ? (
                                                <NavDropdown
                                                        title={
                                                                <span>
                                                                        <img
                                                                                src={nav_user_icon}
                                                                                alt="Your Alt Text"
                                                                                style={{ verticalAlign: "middle", marginRight: ".1rem", marginLeft: ".5rem", marginBottom: ".15rem", height: "0.9rem" }}
                                                                        />
                                                                </span>
                                                        }
                                                        id="basic-nav-dropdown"
                                                >
                                                        <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                                                </NavDropdown>
                                        ) : (
                                                <LinkContainer to="/login">
                                                        <Nav.Link>Login</Nav.Link>
                                                </LinkContainer>
                                        )}
                                </Nav>
                        </Navbar.Collapse>
                </Navbar>
        );
};
