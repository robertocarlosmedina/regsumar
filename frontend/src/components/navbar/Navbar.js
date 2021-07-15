import React, { useState } from 'react'
import { FaSearch,FaUserCircle } from 'react-icons/fa'

import Card from '../UI/card';
import PopUp from '../LogOut/LogOut';

import './style.css'

function Navbar(props){
    const [logOutPopUp, setLogOutPopUp] = useState(false)

    const openLogOutpopUp = () =>{
        setLogOutPopUp(true)
    }
    const closeLogOutpopUp = () =>{
        setLogOutPopUp(false)
    }
    
    return(
        <Card className = "navbar">
            <ul className="right_side">
                <li>
                    <div className="search_label">
                        <input 
                            className="search_input"
                            placeholder="Search or jump to..."
                        />
                        <FaSearch className="ico_search" />
                    </div> 
                </li>
            </ul>
            <ul className="left_side">
                <li>
                    <FaUserCircle className="ico_user" onMouseOver={openLogOutpopUp} cursor="pointer"/>
                    
                </li>
                <li>
                    <p>{props.userName}</p>
                </li>
            </ul>
            {logOutPopUp && <div  onMouseLeave={closeLogOutpopUp} onMouseOver={openLogOutpopUp}><PopUp/></div>}
        </Card>
    )
}

export default Navbar;