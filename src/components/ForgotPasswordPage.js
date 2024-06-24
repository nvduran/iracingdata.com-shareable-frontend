import React, { useState } from "react";
import axios from "axios"; // Assuming you're using axios for HTTP requests
import "../styles/ForgotPasswordPage.css";

function ForgotPasswordPage() {
        const [username, setUsername] = useState("");
        const [securityQuestion, setSecurityQuestion] = useState("");
        const [securityAnswer, setSecurityAnswer] = useState("");
        const [newPassword, setNewPassword] = useState("");
        const [message, setMessage] = useState("");

        const handleUsernameSubmit = async () => {
                try {
                        const response = await axios.get(`https://iracing6-backend.herokuapp.com/api/user-login/security-question?username=${username}`);
                        setSecurityQuestion(response.data.security_question); // Adjusted to match the backend response
                } catch (error) {
                        setMessage("Error fetching security question.");
                }
        };

        const handlePasswordReset = async () => {
                try {
                        const verifyResponse = await axios.post("https://iracing6-backend.herokuapp.com/api/user-login/verify-security-answer", {
                                username,
                                answer: securityAnswer,
                        });

                        if (verifyResponse.data.isCorrect) {
                                // If the security answer is correct, proceed to reset the password.
                                const resetResponse = await axios.post("https://iracing6-backend.herokuapp.com/api/user-login/reset-password", {
                                        username,
                                        answer: securityAnswer,
                                        newPassword,
                                });

                                setMessage(resetResponse.data.message);
                        } else {
                                setMessage(verifyResponse.data.message);
                        }
                } catch (error) {
                        setMessage("Error during password reset.");
                }
        };

        return (
                <div className="fp-container">
                        <h2>Forgot Password</h2>

                        {!securityQuestion ? (
                                <div className="enter-email-div-fp">
                                        <label>
                                                Email Address:
                                                <input type="email" value={username} onChange={(e) => setUsername(e.target.value)} className="fp-input-div-top" />
                                        </label>
                                        <button onClick={handleUsernameSubmit} className="fp-top-submit">
                                                Submit
                                        </button>
                                </div>
                        ) : (
                                <div className="fp-lower-container">
                                        <h3>Security Question</h3>
                                        <p>{securityQuestion}</p>
                                        <label>
                                                Answer:
                                                <input type="text" value={securityAnswer} onChange={(e) => setSecurityAnswer(e.target.value)} className="fp-input-div" />
                                        </label>
                                        <label>
                                                New Password:
                                                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="fp-input-div" />
                                        </label>
                                        <button onClick={handlePasswordReset} className="fp-submit-button">
                                                Submit
                                        </button>
                                </div>
                        )}

                        {message && <p>{message}</p>}
                </div>
        );
}

export default ForgotPasswordPage;
