import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { auth, googleprovider } from "../config/Firebase";

export const Auth = ({ isSignup = false }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate

    const handleAuth = async () => {
        try {
            if (isSignup) {
                // Signup with email and password
                await createUserWithEmailAndPassword(auth, email, password);
                alert("User signed up successfully!");
            } else {
                // Login with email and password
                await signInWithEmailAndPassword(auth, email, password);
                alert("User logged in successfully!");
            }
            navigate("/"); // Navigate to the home page after successful login/signup
        } catch (error) {
            console.error("Error during authentication:", error.message);
            alert(error.message);
        }
    };

    const logInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleprovider);
            alert("User logged in with Google successfully!");
            navigate("/"); // Navigate to the home page after successful Google login
        } catch (error) {
            console.error("Error logging in with Google:", error.message);
            alert(error.message);
        }
    };

    return (
        <div className="space-y-4">
            <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                onClick={handleAuth}
                className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {isSignup ? "Sign Up" : "Login"}
            </button>
            <button
                onClick={logInWithGoogle}
                className="w-full px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Login with Google
            </button>
        </div>
    );
};