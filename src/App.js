import React, { useEffect, useState } from "react";
import { BoxPlotChart } from "./components/BoxPlotChart";
import IRatingGraph from "./components/IRatingGraph";
import { TopNav } from "./components/TopNav";
import { HomePage } from "./components/HomePage";
import IRatingPerClub from "./components/IRatingPerClub";
import { SeasonSummaryMulti } from "./components/SeasonSummaryMulti";
import SeriesPopularity from "./components/SeriesPopularity";
import { IncidentsPerClub } from "./components/IncidentsPerClub";
import { LegacyTimesPerCar } from "./components/LegacyTimesPerCar";
import SeriesSafety from "./components/SeriesSafety";
import PrivacyPolicy from "./components/PrivacyPolicy";
import ContactMe from "./components/ContactMe";
import CareerStats from "./components/CareerStats";
import SeriesLapTimeChart from "./components/SeriesLapTimeChart";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import SupportPage from "./components/SupportPage";
import RaceResultsPage from "./components/RaceResultsPage";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import AdSenseScript from "./components/AdSenseScript";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
        const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

        // Retrieve the isPaidUser value from localStorage and convert it to a boolean for the initial state
        const initialIsPaidUser = localStorage.getItem("isPaidUser") === "true";

        // Create a state for shouldLoadAds
        const [shouldLoadAds, setShouldLoadAds] = useState(!initialIsPaidUser);

        useEffect(() => {
                // Update shouldLoadAds based on the isPaidUser value in localStorage whenever isLoggedIn changes
                const isPaidUser = localStorage.getItem("isPaidUser") === "true";
                setShouldLoadAds(!isPaidUser);
        }, [isLoggedIn]);

        const tracks = [
                "Circuit%20de%20Barcelona%20Catalunya",
                "Fuji%20International%20Speedway",

                // "Algarve%20International%20Circuit",
                // "Aut%C3%B3dromo%20Jos%C3%A9%20Carlos%20Pace",
                // "Watkins%20Glen%20International",
                // "Road%20America",
                // "Autodromo%20Nazionale%20Monza",
                // "Circuit%20des%2024%20Heures%20du%20Mans",
                // "Sebring%20International%20Raceway",
                // "Red%20Bull%20Ring",
                // "Mount%20Panorama%20Circuit",
                // "N%C3%BCrburgring%20Combined",
                // "Suzuka%20International%20Racing%20Course",
                // "Road%20Atlanta",
        ];

        const gt4Tracks = [
                "Motorsport%20Arena%20Oschersleben",
                "Watkins%20Glen%20International",

                // "Oulton%20Park%20Circuit",
                // "Sebring%20International%20Raceway",
                // "Barber Motorsports Park",
                // "Circuit%20Zandvoort",
                // "Road%20Atlanta",
                // "Autodromo%20Internazionale%20Enzo%20e%20Dino%20Ferrari",
                // "MotorLand%20Arag%C3%B3n",
                // "N%C3%BCrburgring%20Combined",
                // "Algave%20International%20Circuit",
                // "WeatherTech%20Raceway%20at%20Laguna%20Seca",
                // "Circuit%20de%20Spa-Francorchamps",
                // "Mid-Ohio%20Sports%20Car%20Course",
        ];

        const imsaTracks = [
                "Watkins%20Glen%20International",
                "Algarve%20International%20Circuit",

                // "Suzuka%20International%20Racing%20Course",
                // "Sebring%20International%20Raceway",
                // "Algarve%20International%20Circuit",
                // "Autodromo%20Internazionale%20Enzo%20e%20Dino%20Ferrari",
                // "Road%20Atlanta",
                // "Long%20Beach%20Street%20Circuit",
                // "Autodromo%20Internazionale%20del%20Mugello",
                // "Circuit%20de%20Spa-Francorchamps",
                // "WeatherTech%20Raceway%20at%20Laguna%20Seca",
                // "Indianapolis%20Motor%20Speedway",
                // "Misano%20World%20Circuit%20Marco%20Simoncelli",
                // "Detroit%20Grand%20Prix%20at%20Belle%20Isle",
        ];

        const tcrTracks = [
                "Snetterton%20Circuit",
                "Watkins%20Glen%20International",

                // "Summit%20Point%20Raceway",
                // "Sebring%20International%20Raceway",
                // "Donington%20Park%20Racing%20Circuit",
                // "Circuit%20Zandvoort",
                // "Charlotte%20Motor%20Speedway",
                // "Autodromo%20Internazionale%20Enzo%20e%20Dino%20Ferrari",
                // "Knockhill%20Racing%20Circuit",
                // "WeatherTech%20Raceway%20at%20Laguna%20Seca",
                // "Road%20Atlanta",
                // "N%C3%BCrburgring%20Combined",
                // "Oulton%20Park%20Circuit",
                // "Mid-Ohio%20Sports%20Car%20Course",
        ];

        const pccTracks = [
                "Okayama%20International%20Circuit",
                "Mount%20Panorama%20Circuit",

                // "Watkins%20Glen%20International",
                // "Sandown%20International%20Motor%20Raceway",
                // "Snetterton%20Circuit",
                // "Summit%20Point%20Raceway",
                // "Canadian%20Tire%20Motorsports%20Park",
                // "Donington%20Park%20Racing%20Circuit",
                // "Rudskogen%20Motorsenter",
                // "Mid-Ohio%20Sports%20Car%20Course",
                // "Brands%20Hatch%20Circuit",
                // "Motorsport%20Arena%20Oschersleben",
                // "Virginia%20International%20Raceway",
        ];

        const imsaEnduranceTracks = ["Watkins%20Glen%20International", "N%C3%BCrburgring%20Combined"];

        return (
                <Router>
                        <div className="App">
                                <AdSenseScript shouldLoadAds={shouldLoadAds} />
                                <TopNav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

                                <Routes>
                                        <Route path="/" element={<HomePage />} />
                                        <Route path="/charts/iRating" element={<IRatingGraph />} />
                                        <Route path="/charts/SeriesSafety" element={<SeriesSafety />} />
                                        <Route path="/charts/VRS" element={<BoxPlotChart season={"GT%20Sprint%20Simucube%20Series%20-%202024%20Season%203"} tracks={tracks} />} />
                                        <Route path="/charts/FanatecFixed" element={<BoxPlotChart season={"GT3 Fanatec Challenge - Fixed - 2024 Season 3 - Fixed"} tracks={tracks} />} />
                                        <Route path="/charts/PCC" element={<BoxPlotChart season={"Production%20Car%20Sim-Lab%20Challenge%20-%202024%20Season%203"} tracks={pccTracks} />} />
                                        <Route path="/charts/SCC" element={<BoxPlotChart season={"Falken%20Tyre%20Sports%20Car%20Challenge%20-%202024%20Season%203"} tracks={gt4Tracks} />} />
                                        <Route path="/charts/GT4Fixed" element={<BoxPlotChart season={"GT4%20Falken%20Tyre%20Challenge%20-%202024%20Season%203%20Fixed"} tracks={gt4Tracks} />} />
                                        <Route path="/charts/IMSA" element={<BoxPlotChart season={"IMSA%20iRacing%20Series%20-%202024%20Season%203"} tracks={imsaTracks} />} />
                                        <Route path="/charts/IMSAFixed" element={<BoxPlotChart season={"IMSA%20iRacing%20Series%20-%20Fixed%20-%202024%20Season%203"} tracks={imsaTracks} />} />
                                        <Route path="/charts/IMSAEndurance" element={<BoxPlotChart season={"IMSA%20Endurance%20Series%20-%202024%20Season%203"} tracks={imsaEnduranceTracks} />} />
                                        <Route path="/charts/TCR" element={<BoxPlotChart season={"TCR%20Virtual%20Challenge%20-%202024%20Season%203"} tracks={tcrTracks} />} />
                                        <Route path="/charts/TCRFixed" element={<BoxPlotChart season={"TCR%20Virtual%20Challenge%20-%20Fixed%20-%202024%20Season%203"} tracks={tcrTracks} />} />
                                        <Route path="/charts/IRatingPerClub" element={<IRatingPerClub />} />
                                        <Route path="/charts/IncidentsPerClub" element={<IncidentsPerClub />} />
                                        <Route path="/charts/SeriesPopularity" element={<SeriesPopularity />} />
                                        <Route path="/charts/SeasonSummaryMulti" element={<SeasonSummaryMulti />} />
                                        <Route path="about/privacypolicy" element={<PrivacyPolicy />} />
                                        <Route path="about/Contact" element={<ContactMe />} />
                                        <Route path="user/careerstats/:custid?" element={<CareerStats />} />
                                        <Route path="charts/SeriesLapTimeChart/:season_name?" element={<SeriesLapTimeChart />} />
                                        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
                                        <Route path="/register" element={<RegisterPage />} />
                                        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                                        <Route path="/support" element={<SupportPage />} />
                                        <Route path="/RaceResults/:subsession_id" element={<RaceResultsPage />} />
                                </Routes>
                        </div>
                </Router>
        );
}
export default App;
