import React from "react";
import './App.css';
import Signup from "./components/signup";
import Login from "./components/login";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Home from "./components/Home";
import Addnote from "./components/home_components/Addnote";
import Viewnote from "./components/home_components/Viewnote";

function App(){

    return(
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/addnote" element={<Addnote/>}/>
                    <Route path="/viewnote" element={<Viewnote/>}/>
                </Routes>
            </Router>
        </>
    )
}
export default App;