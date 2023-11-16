import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Navbar";
import "./App.css";

import Home from "./views/Home";
import Questions from "./views/Questions";
import SignUp from "./views/SignUp";
import Container from "react-bootstrap/Container";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Container>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/questions' element={<Questions />} />
                    <Route path='/signup' element={<SignUp />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;
