import React, { useState } from "react"
import { FaUserCircle } from 'react-icons/fa'

import Card from "../UI/card"
import Api from '../api/api'

import './setting.css'

const Settings  = (props) =>{
    const [valid, setValid] =useState(true);
    const [changed, setChange] =useState(false);
    const [oldPasswd, setOldPasswd] = useState("");
    const [newPasswd, setNewPasswd] = useState("");
    const [confirmPasswd, setConfirmPasswd] = useState("");

    const oldPasswdChangeHandler = (event) =>{
        setOldPasswd(event.target.value)
    }
    const newPasswdChangeHandler = (event) =>{
        setNewPasswd(event.target.value)
    }
    const confirmPasswdChangeHandler = (event) =>{
        setConfirmPasswd(event.target.value)
    }

    const onChangeHandler = () =>{
        if(props.userInfo.password === oldPasswd
            && newPasswd === confirmPasswd && newPasswd !== ""){
                Api.put("/auth/edit/"+props.id, { password: newPasswd}).then(res=>{
                    if(res.data){
                        setChange(true)
                    }
                })
        }
        else{
            setValid(false)
        }
    }

    return(
        <Card className="sumario_new">
            
            <ul className="setting_info">
                <li>
                    <div className="user_display">
                        <p className="hidden">..</p>
                        <FaUserCircle className="setting_ico"/>
                        <p className="name"> {props.userInfo.name}</p>
                    </div>
                </li>
                <li>
                    <div className="info_user">
                        <h2>Account Info</h2>
                        <h3>Email</h3>
                        <p>{props.userInfo.email}</p>
                    </div>
                </li>
                <li>
                    <div>
                        <h2>Password Restart</h2>
                        <form>
                            <p><label>Old password</label></p>
                            <input className="input_settings"
                                   type="password"
                                   value={oldPasswd}
                                   onChange={oldPasswdChangeHandler}
                            />
                            <p><label>New password</label></p>
                            <input className="input_settings"
                                   type="password"
                                   value={newPasswd}
                                   onChange={newPasswdChangeHandler}
                             />
                            <p><label>Confirm New password</label></p>
                            <input className="input_settings" 
                                   type="password"
                                   value={confirmPasswd}
                                   onChange={confirmPasswdChangeHandler}
                            />
                        </form>
                        <button className="update_button" onClick={onChangeHandler}>Update</button>
                    </div>
                </li>
            </ul>
            {!valid && !changed &&<p className="not_valid_pass">Passwords did not match.</p>}
            {changed && <p className="change_save">Password updated.</p>}
        </Card>
    )
}

export default Settings