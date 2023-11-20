import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Navbar";
import "./App.css";

import Home from "./views/Home";
import Questions from "./views/Questions";
import SignUp from "./views/SignUp";
import Container from "react-bootstrap/Container";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import { toast, Slide } from "react-toastify";

import { useState, useEffect } from "react";
import UserResponse from "./types/userResponse";

function App() {
    const [currentUser, setCurrentUser] = useState<UserResponse | null>(null);
    // const token = localStorage.getItem("token");
    useEffect(() => {
        if (currentUser) {
        } else {
            localStorage.clear();
        }
    }, [currentUser]);

    function Logout() {
        const navigate = useNavigate();
        useEffect(() => {
            navigate("/");
            setCurrentUser(null);
        }, []);

        toast("User logged out", {
            type: "success",
            transition: Slide,
        });

        return <p>Logging Out</p>;
    }

    return (
        <BrowserRouter>
            <Header currentUser={currentUser} />
            <Container>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/questions' element={<Questions />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route
                        path='/login'
                        element={<Login setCurrentUser={setCurrentUser} />}
                    />
                    <Route
                        path='/dashboard'
                        element={<Dashboard currentUser={currentUser} />}
                    />
                    <Route path='/logout' element={<Logout />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;
