import React from "react";
import './Home.css';
import Header from "./home_components/Header";
import Notes from "./home_components/Notes";

function Home(){

    return(
        <div>
            <Header/>
           <Notes/>
        </div>
    )
}
export default Home;