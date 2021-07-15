import React from "react"
import  { Link } from 'react-router-dom'

import Card from "../UI/card"

import './LogOut.css'

const PopUp = () =>{
    return(
        <Card className="LogOut_popUp">
            <div className="logOut_control">
                <Link to="/"><p >Log Out</p></Link>
            </div>
        </Card>
    )
}

export default PopUp