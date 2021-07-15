import React, { useState } from "react";
import { useHistory } from "react-router";
import axios from 'axios'
import Card from '../UI/card'
import { FaRegListAlt } from 'react-icons/fa'
import './style.css'

function LoginPane() {

    const api = axios.create({
        baseURL:`http://localhost:3001`
    })

    const history = useHistory();
    const [valid, setValid] =useState(true);
    const [userInput, setUserInput] = useState({
        email:"",
        password:"",
    });

    const emailChangeHandler = (event) =>{
        setUserInput((prevState) =>{
            // ...prevState -> permite criar um objeto apartir de uma ja previamente existente
            return {...prevState, email: event.target.value}
        })
    }

    const passwdChangeHandler = (event) =>{
        setUserInput((prevState) =>{
            return {...prevState, password: event.target.value}
        })
    }


    const submitHandler = async (event) =>{
        event.preventDefault() // o submit não e enviado um pedido para nenhum servidor
        //console.log(userInput)
        api.post('/auth', { email: userInput.email, password: userInput.password }).then(res=>{
            // Verify if the object return is a empty one
            if(Object.entries(res.data).length === 0){
                setValid(false)
            }
            else{
                setValid(true)
                history.push("/homepage/"+res.data.role+"/start/"+res.data.id)
            }
        })
        
    }

    return (
        <Card className="centerCard">
            <div className="title">
                <FaRegListAlt className="icon_regs"/>
                <p className="title_1">Sign in to RegSumar</p>
            </div>
            <Card className="login">
                <form onSubmit={submitHandler}>
                    <p className="label_input"><label>Email</label></p>
                    <input 
                        className="input_box" 
                        type="email"
                        value={userInput.email} 
                        onChange={emailChangeHandler}
                    />
                    <p className="label_input"><label>Password</label></p>
                    <input 
                        className="input_box" 
                        type="password"
                        value={userInput.password} 
                        onChange={passwdChangeHandler}
                    />
                    <p><button className="action"  type="submit" onClick={submitHandler}>Sign in</button></p>
                    {!valid && <p className="invalid_text">Incorrect email or password</p>}
                </form>
            </Card>
        </Card> 
    )
}

export default LoginPane;
