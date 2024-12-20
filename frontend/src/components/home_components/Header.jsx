import React from "react";
import { Link } from "react-router-dom";
import './Header.css';

function Header(){

    return(
        <header>
            
                <div className="head">
                <div className="box">
                    <p>MyDairy</p>
                </div>
                </div>
                
                
                <nav>
                    <Link to='/home'>Dashboard</Link>
                    <Link to='/settings'>Settings</Link>
                    <Link to='/'>Log Out</Link>
                </nav>
                
                <div className="search">
                    <input type="text" className="search_input" placeholder="Search Notes..."/>
                   
                </div>
               
           
        </header>
    );
}
export default Header;