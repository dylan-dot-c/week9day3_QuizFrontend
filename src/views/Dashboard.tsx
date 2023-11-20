import UserQuestions from "../components/UserQuestions";
import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Profile from "../components/Profile";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Dashboard() {
    const navigate = useNavigate();
    const [key, setKey] = useState("home");
    const token = localStorage.getItem("token");

    if (token == null) {
        toast("You must be logged in to access this page", {
            type: "error",
        });
        navigate("/");
    }

    return (
        <Tabs
            id='controlled-tab-example'
            activeKey={key}
            onSelect={(k) => setKey(k!)}
            className='mb-3 mt-5 pt-4'>
            <Tab eventKey='home' title='My Questions'>
                <UserQuestions />
            </Tab>
            <Tab eventKey='profile' title='Profile'>
                <Profile />
            </Tab>
        </Tabs>
    );
}

export default Dashboard;
