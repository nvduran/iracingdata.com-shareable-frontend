import React from "react";
import "../styles/SupportPage.css";

const SupportPage = () => {
        return (
                <div className="support-page">
                        <h2>Support The Site</h2>
                        <p>Thank you all so much for your support and for using this site.</p>
                        <p>
                                As the user base increases, the associated database and server costs are increasing as well. Running ads has helped, but barely scratches the surface of the server
                                costs.
                        </p>
                        <div className="patreon-section">
                                <p>
                                        If you would like to directly support the site and have an <span className="ad-free-highlight">ad-free experience</span>, please consider subscribing on Patreon
                                        at $1 per month.
                                </p>

                                <span className="special-note-account">
                                        * In order to remove ads, please add your patreon email address to your iracingData account upon creation, or email contact@iracingdata.com.{" "}
                                </span>
                                <a href="https://www.patreon.com/iRacingData" className="patreon-button">
                                        Support on Patreon
                                </a>
                        </div>
                </div>
        );
};

export default SupportPage;
