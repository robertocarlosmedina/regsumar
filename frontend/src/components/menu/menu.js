import React from 'react'
import { useHistory } from 'react-router-dom'
import { FaRegListAlt, FaList, FaPen } from 'react-icons/fa'
import { AiFillSetting } from 'react-icons/ai'

import Card from '../UI/card'

import './style.css'


function Menu(props){
    const history = useHistory();

    function allSumHandler(){
        history.push("/homepage/"+props.role+"/sumarios/"+props.id)
    }
    function newSumHandler(){
        history.push("/homepage/"+props.role+"/newSumario/"+props.id)
    }
    function settingHandler(){
        history.push("/homepage/"+props.role+"/settings/"+props.id)
    }

    return (
        <Card className="menu">
            <FaRegListAlt className="ico_reg"/>
            <p className="menu_title">RegSumar</p>
            <div className="menu_link">
                <div className="menu_li" onClick={allSumHandler}><p >All Sum</p><FaList className="menu_ico_list"/> </div>
                {props.role !== "Estudantes" &&
                    <div className="menu_li" onClick={newSumHandler}>
                        <p >New Sum</p>
                        <FaPen className="menu_ico_pen"/>
                    </div>}
                <div className="menu_li" onClick={settingHandler}><p >Settings</p><AiFillSetting className="menu_ico_setting"/></div>
            </div>
        </Card>
    )
}

export default Menu;