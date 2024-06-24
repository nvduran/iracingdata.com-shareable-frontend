import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { getIconFileName } from "../utils/iconUtils";
import "../styles/RaceResultsPage.css";

const RaceResultsPage = () => {
        const [raceData, setRaceData] = useState(null);
        const [isLoading, setIsLoading] = useState(true);
        const [error, setError] = useState(null);
        const subsessionParam = useParams();
        const [recentSessions, setRecentSessions] = useState(null);
        const [recentSessionsLoading, setRecentSessionsLoading] = useState(true);
        const [percentilesLoading, setPercentilesLoading] = useState(true);
        const [percentiles, setPercentiles] = useState(null);
        const [percentilesQuali, setPercentilesQuali] = useState(null);
        const [searchId, setSearchId] = useState("");

        useEffect(() => {
                // Function to fetch race data
                const fetchRaceData = async () => {
                        setIsLoading(true);
                        try {
                                const response = await fetch(`https://iracing6-backend.herokuapp.com/api/sessionData/results/${subsessionParam.subsession_id}`);
                                if (!response.ok) {
                                        throw new Error("Network response was not ok");
                                }
                                const data = await response.json();
                                setRaceData(data);
                                // Additional fetches or logic here...
                                fetchPercentiles(data.season_name, "QUALIFY");
                                fetchPercentiles(data.season_name, "RACE");
                        } catch (error) {
                                console.error("Error fetching data:", error);
                                setError("no subsession ID found");
                        } finally {
                                setIsLoading(false);
                        }
                };

                // Call the fetch function if subsessionParam.subsession_id is available
                if (subsessionParam.subsession_id) {
                        fetchRaceData();
                } else {
                        setIsLoading(false);
                }
        }, [subsessionParam.subsession_id]);

        // pull percentiles from backend

        const fetchPercentiles = async (season, type) => {
                try {
                        const response = await axios.get(`https://iracing6-backend.herokuapp.com/api/series-car-percentiles/?seasonName=${season}&sessionType=${type}`);
                        if (type === "RACE") {
                                setPercentiles(response.data);
                        }
                        if (type === "QUALIFY") {
                                setPercentilesQuali(response.data);
                        }
                } catch (error) {
                        console.error("Error fetching recent sessions:", error);
                } finally {
                        setPercentilesLoading(false);
                }
        };

        const calculatePercentile = (value, carClass, sessionType) => {
                if (percentiles && sessionType === "RACE") {
                        // make sure carClass matches percentiles.car_class_name
                        let carClassIndex = percentiles[0].car_class_name;
                        if (carClassIndex !== carClass) {
                                return "error";
                        }

                        // make sure that sessionType matches percentiles.session_type
                        let sessionTypeIndex = percentiles[0].session_type;
                        if (sessionTypeIndex !== sessionType) {
                                return "error";
                        }

                        // find the percentiles.percentiles[] value that is closest to value
                        let closestPercentile = 0;
                        let closestPercentileIndex = 0;
                        let closestPercentileValue = 0;
                        for (let i = 0; i < percentiles[0].percentiles.length; i++) {
                                let currentPercentile = percentiles[0].percentiles[i];
                                if (Math.abs(currentPercentile - value) < Math.abs(closestPercentile - value)) {
                                        closestPercentile = currentPercentile;
                                        closestPercentileIndex = i;
                                        closestPercentileValue = currentPercentile;
                                }
                        }
                        return closestPercentileIndex;
                }
                if (percentilesQuali && sessionType === "QUALIFY") {
                        // make sure carClass matches percentiles.car_class_name
                        let carClassIndex = percentilesQuali[0].car_class_name;
                        if (carClassIndex !== carClass) {
                                return "error";
                        }

                        // make sure that sessionType matches percentiles.session_type
                        let sessionTypeIndex = percentilesQuali[0].session_type;
                        if (sessionTypeIndex !== sessionType) {
                                return "error";
                        }

                        // find the percentiles.percentiles[] value that is closest to value
                        let closestPercentile = 0;
                        let closestPercentileIndex = 0;
                        let closestPercentileValue = 0;
                        for (let i = 0; i < percentilesQuali[0].percentiles.length; i++) {
                                let currentPercentile = percentilesQuali[0].percentiles[i];
                                if (Math.abs(currentPercentile - value) < Math.abs(closestPercentile - value)) {
                                        closestPercentile = currentPercentile;
                                        closestPercentileIndex = i;
                                        closestPercentileValue = currentPercentile;
                                }
                        }
                        return closestPercentileIndex;
                }
        };

        const calculateLeaderboardPosition = (value, carClass, sessionType) => {
                if (sessionType === "RACE") {
                        if (percentiles) {
                                // make sure carClass matches percentiles.car_class_name
                                let carClassIndex = percentiles[0].car_class_name;
                                if (carClassIndex !== carClass) {
                                        return "error";
                                }

                                // calculate the closest percentiles[0].leaderboard to value, and return the index
                                let closestLeaderboard = 0;
                                let closestLeaderboardIndex = 0;
                                let closestLeaderboardValue = 0;
                                for (let i = 0; i < percentiles[0].leaderboard.length; i++) {
                                        let currentLeaderboard = percentiles[0].leaderboard[i];
                                        if (Math.abs(currentLeaderboard - value) < Math.abs(closestLeaderboard - value)) {
                                                closestLeaderboard = currentLeaderboard;
                                                closestLeaderboardIndex = i;
                                                closestLeaderboardValue = currentLeaderboard;
                                        }
                                }
                                return closestLeaderboardIndex + 1;
                        }
                }
                if (sessionType === "QUALIFY") {
                        if (percentilesQuali) {
                                // calculate the closest percentiles[0].leaderboard to value, and return the index
                                let closestLeaderboard = 0;
                                let closestLeaderboardIndex = 0;
                                let closestLeaderboardValue = 0;
                                for (let i = 0; i < percentilesQuali[0].leaderboard.length; i++) {
                                        let currentLeaderboard = percentilesQuali[0].leaderboard[i];
                                        if (Math.abs(currentLeaderboard - value) < Math.abs(closestLeaderboard - value)) {
                                                closestLeaderboard = currentLeaderboard;
                                                closestLeaderboardIndex = i;
                                                closestLeaderboardValue = currentLeaderboard;
                                        }
                                }
                                return closestLeaderboardIndex + 1;
                        }
                }
        };

        useEffect(() => {
                const fetchRecentSessions = async () => {
                        // todo: avoid if already on the results page
                        try {
                                const response = await axios.get(`https://iracing6-backend.herokuapp.com/api/sessionData/resultsrecent?limit=200`);
                                setRecentSessions(response.data);
                        } catch (error) {
                                console.error("Error fetching recent sessions:", error);
                        } finally {
                                setRecentSessionsLoading(false);
                        }
                };
                fetchRecentSessions();
        }, []);

        // Method to get the icon URL
        const getIconUrl = (seasonName) => {
                const iconName = getIconFileName(seasonName);
                // Assuming the icons are stored in the public folder under assets
                return `${process.env.PUBLIC_URL}/assets/series-icons/${iconName}.png`;
        };

        const handleSessionClick = (subsession_id) => {
                window.location.href = `/RaceResults/${subsession_id}`;
        };

        const navigate = useNavigate();

        const handleNameLink = (id) => {
                navigate(`/user/careerstats/${id}`);
        };

        const handleSearchChange = (e) => {
                setSearchId(e.target.value);
        };

        const handleSearchSubmit = () => {
                if (searchId) {
                        navigate(`/RaceResults/${searchId}`, { replace: true });
                }
        };

        // Process the sessions data into a unique structure
        const uniqueSessionData = {};

        if (recentSessions) {
                recentSessions.forEach((session) => {
                        const key = `${session.start_time} - ${session.season_name}`;
                        if (!uniqueSessionData[key]) {
                                uniqueSessionData[key] = [];
                        }
                        uniqueSessionData[key].push(session);
                });
        }

        const renderSessions = () => {
                if (!recentSessions) {
                        return <div>Loading recent sessions...</div>;
                }
                return Object.entries(uniqueSessionData).map(([key, sessions], index) => {
                        let separatorIndex = key.indexOf(" - ");
                        let firstPart = key.substring(0, separatorIndex);
                        let secondPart = key.substring(separatorIndex + 3); // +3 to remove " - " from the start of the second part

                        let timestamp = new Date(firstPart);
                        let now = new Date();
                        let timeDiff = now - timestamp;

                        let timeSince = formatTimeSince(timeDiff);

                        return (
                                <div className="centering-div-rr-1">
                                        <div key={index} className="recent-race-list-cont">
                                                <div className="logo-square-rr">
                                                        {/* this is the season name */}
                                                        {/* <h3>{secondPart}</h3> */}
                                                        <img src={getIconUrl(secondPart)} style={{ maxWidth: "7rem", maxHeight: "5rem" }} />
                                                        <h3>{timeSince}</h3>
                                                </div>
                                                <div className="subsession-side-rr">
                                                        {sessions
                                                                .sort((a, b) => b.event_strength_of_field - a.event_strength_of_field)
                                                                .map((session, index) => (
                                                                        <div key={index} className="subsession-box-rr" onClick={() => handleSessionClick(session.subsession_id)}>
                                                                                <h3>SoF: {session.event_strength_of_field}</h3>
                                                                                <p>ID: {session.subsession_id}</p>
                                                                        </div>
                                                                ))}
                                                </div>
                                        </div>
                                        <div className="recent-race-series-name-row">{sessions[0].season_name}</div>
                                </div>
                        );
                });
        };

        const formatTimeSince = (timeDiff) => {
                // Convert timeDiff from milliseconds to minutes, hours, days, etc.
                // and format it as a string like "2 hours ago", "3 days ago"
                // This is a basic example, you might want to handle different cases
                let minutes = Math.floor(timeDiff / 60000);
                let hours = Math.floor(minutes / 60);
                let days = Math.floor(hours / 24);

                if (days > 0) {
                        return `Started: ${days} day(s) ago`;
                } else if (hours > 0) {
                        return `Started: ${hours} hour(s) ago`;
                } else {
                        return `Started: ${minutes} minutes ago`;
                }
        };

        if (isLoading) {
                return <div>Loading...</div>;
        }

        if (error) {
                if (error === "no subsession ID found") {
                        return (
                                <div className="no-session-cont">
                                        <div>Recent Races:</div>
                                        <div className="session-search-div">
                                                <input className="rr-ss-search" type="text" value={searchId} onChange={handleSearchChange} placeholder="Search Subsession ID" />
                                                <button className="button-go-rr" onClick={() => handleSessionClick(searchId)}>
                                                        {" "}
                                                        →{" "}
                                                </button>
                                        </div>
                                        <div className="rr-or-div">Or, click a session below</div>

                                        <div className="centering-div-rr">{renderSessions()}</div>
                                </div>
                        );
                } else {
                        return <div>Error loading data.</div>;
                }
        }

        if (raceData) {
                function getLicenseLevelLetter(level) {
                        if (level >= 15 && level <= 20) {
                                return "A";
                        } else if (level >= 10 && level <= 14) {
                                return "B";
                        } else if (level >= 5 && level <= 9) {
                                return "C";
                        } else if (level >= 1 && level <= 4) {
                                return "D";
                        } else {
                                return "Unknown"; // For any unexpected value
                        }
                }
                return (
                        <div className="race-results-cont">
                                <div className="rr-sesh-info-cont">
                                        <div className="rr-sesh-info-item">Subsession ID: {subsessionParam.subsession_id}</div>
                                        <div className="rr-sesh-info-item">{raceData.event_strength_of_field} SoF</div>
                                        <div className="rr-sesh-info-item">{raceData.season_name}</div>
                                        <div className="rr-sesh-info-item">Start Time: {raceData.start_time}</div>
                                        <div className="rr-sesh-info-item">{raceData.track_name}</div>
                                </div>
                                <div className="sesh-centering-div">
                                        <div className="sesh-type-title">RACE</div>
                                </div>
                                <div className="race-result-table-row-headers-cont">
                                        <div className="race-result-table-row-headers-block-pos">Pos</div>
                                        <div className="race-result-table-row-headers-block-driver">Driver</div>
                                        <div className="race-result-table-row-headers-block-irsr">ir/sr</div>
                                        <div className="race-result-table-row-headers-block-car">Car</div>
                                        <div className="race-result-table-row-headers-block-fl">Fastest Lap</div>
                                </div>
                                {raceData.results.map((element, index) =>
                                        element.simsession_name === "RACE"
                                                ? element.results.map((result, index) =>
                                                          // hide the results with fastest lap times of -1
                                                          result.best_lap_time !== -1 ? (
                                                                  <div key={index} className="race-result-table-row-cont">
                                                                          <div className="race-result-table-row-block-pos">{result.finish_position + 1}</div>
                                                                          <div className="race-result-table-row-block-name" onClick={() => handleNameLink(result.cust_id)}>
                                                                                  {result.display_name}
                                                                          </div>
                                                                          <div className="race-result-table-row-block-irsr">
                                                                                  <div className="rrir">
                                                                                          {result.newi_rating}
                                                                                          {result.oldi_rating > result.newi_rating ? (
                                                                                                  <p>-{result.oldi_rating - result.newi_rating}</p>
                                                                                          ) : (
                                                                                                  <p>+{result.newi_rating - result.oldi_rating}</p>
                                                                                          )}
                                                                                  </div>
                                                                                  <div className="rrsr">
                                                                                          {getLicenseLevelLetter(result.new_license_level)}{" "}
                                                                                          {result.new_sub_level.toString().length > 1
                                                                                                  ? result.new_sub_level.toString().slice(0, 1) + "." + result.new_sub_level.toString().slice(1)
                                                                                                  : result.new_sub_level}
                                                                                          {result.old_sub_level > result.new_sub_level ? (
                                                                                                  <p>-{(result.old_sub_level - result.new_sub_level) / 100}</p>
                                                                                          ) : (
                                                                                                  <p>+{(result.new_sub_level - result.old_sub_level) / 100}</p>
                                                                                          )}
                                                                                  </div>
                                                                          </div>

                                                                          <div className="race-result-table-row-block-car">{result.car_name}</div>
                                                                          <div className="race-result-table-row-block-fl">
                                                                                  {Math.floor(result.best_lap_time / 10000 / 60) +
                                                                                          ":" +
                                                                                          ("0" + Math.floor((result.best_lap_time / 10000) % 60)).slice(-2) +
                                                                                          ":" +
                                                                                          ("000" + (result.best_lap_time % 10000)).slice(-4)}
                                                                          </div>
                                                                          <div className="race-result-table-row-block-equals">=</div>
                                                                          <div
                                                                                  className={`race-result-table-row-block-perc ${
                                                                                          calculatePercentile(result.best_lap_time, result.car_class_name, "RACE") === 0
                                                                                                  ? "percentile-top-0"
                                                                                                  : calculatePercentile(result.best_lap_time, result.car_class_name, "RACE") <= 5
                                                                                                  ? "percentile-top-5"
                                                                                                  : ""
                                                                                  }`}
                                                                          >
                                                                                  {calculatePercentile(result.best_lap_time, result.car_class_name, "RACE") === 0
                                                                                          ? "Week Rank " + "#" + calculateLeaderboardPosition(result.best_lap_time, result.car_class_name, "RACE")
                                                                                          : `Top ${calculatePercentile(result.best_lap_time, result.car_class_name, "RACE")}%`}
                                                                          </div>
                                                                  </div>
                                                          ) : null
                                                  )
                                                : null
                                )}
                                <div className="sesh-centering-div">
                                        <div className="sesh-type-title">QUALIFYING</div>
                                </div>
                                {raceData.results.map((element, index) =>
                                        element.simsession_name === "QUALIFY"
                                                ? element.results.map((result, index) =>
                                                          // hide the results with fastest lap times of -1
                                                          result.best_lap_time !== -1 ? (
                                                                  <div key={index} className="race-result-table-row-cont">
                                                                          <div className="race-result-table-row-block-pos">{result.finish_position + 1}</div>
                                                                          <div className="race-result-table-row-block-name" onClick={() => handleNameLink(result.cust_id)}>
                                                                                  {result.display_name}
                                                                          </div>
                                                                          <div className="race-result-table-row-block-irsr">
                                                                                  <div className="rrir">
                                                                                          {result.newi_rating}
                                                                                          {result.oldi_rating > result.newi_rating ? (
                                                                                                  <p>-{result.oldi_rating - result.newi_rating}</p>
                                                                                          ) : (
                                                                                                  <p>+{result.newi_rating - result.oldi_rating}</p>
                                                                                          )}
                                                                                  </div>
                                                                                  <div className="rrsr">
                                                                                          {getLicenseLevelLetter(result.new_license_level)}{" "}
                                                                                          {result.new_sub_level.toString().length > 1
                                                                                                  ? result.new_sub_level.toString().slice(0, 1) + "." + result.new_sub_level.toString().slice(1)
                                                                                                  : result.new_sub_level}
                                                                                          {result.old_sub_level > result.new_sub_level ? (
                                                                                                  <p>-{(result.old_sub_level - result.new_sub_level) / 100}</p>
                                                                                          ) : (
                                                                                                  <p>+{(result.new_sub_level - result.old_sub_level) / 100}</p>
                                                                                          )}
                                                                                  </div>
                                                                          </div>

                                                                          <div className="race-result-table-row-block-car">{result.car_name}</div>
                                                                          <div className="race-result-table-row-block-fl">
                                                                                  {Math.floor(result.best_lap_time / 10000 / 60) +
                                                                                          ":" +
                                                                                          ("0" + Math.floor((result.best_lap_time / 10000) % 60)).slice(-2) +
                                                                                          ":" +
                                                                                          ("000" + (result.best_lap_time % 10000)).slice(-4)}
                                                                          </div>
                                                                          <div className="race-result-table-row-block-equals">=</div>
                                                                          <div
                                                                                  className={`race-result-table-row-block-perc ${
                                                                                          calculatePercentile(result.best_lap_time, result.car_class_name, "QUALIFY") === 0
                                                                                                  ? "percentile-top-0"
                                                                                                  : calculatePercentile(result.best_lap_time, result.car_class_name, "QUALIFY") <= 5
                                                                                                  ? "percentile-top-5"
                                                                                                  : ""
                                                                                  }`}
                                                                          >
                                                                                  {calculatePercentile(result.best_lap_time, result.car_class_name, "QUALIFY") === 0
                                                                                          ? "Week Rank " + "#" + calculateLeaderboardPosition(result.best_lap_time, result.car_class_name, "QUALIFY")
                                                                                          : `Top ${calculatePercentile(result.best_lap_time, result.car_class_name, "QUALIFY")}%`}
                                                                          </div>
                                                                  </div>
                                                          ) : null
                                                  )
                                                : null
                                )}
                        </div>
                );
        } else {
                return <div>No subsession ID found in the URL.</div>;
        }
};

export default RaceResultsPage;
