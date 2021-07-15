import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { BiLoader } from 'react-icons/bi'
import axios from 'axios'

import './deleteSumario.css'

const api = axios.create({
    baseURL:`http://localhost:3001/`
})

class DeleteSumario extends Component{
    state={
        sumDeleted:true,
        classDeleted:true,
    }
    constructor(props){
        super()
        api.delete('sumario/delete/'+props.idSumario).then(res =>{
            console.log(res.data)
            this.setState({ sumDeleted:true })
        }) 
        api.delete('class/delete/'+props.idClass).then(res =>{
            console.log(res.data)
            this.setState({ classDeleted:true })
        })  
    }

    render(){
        return(
            <div>
                {this.state.sumDeleted && this.state.classDeleted && 
                    <div className="deleted_back">
                        <p>The Sum was been deleted.</p>
                        <Link to={"/homepage/"+this.props.role+"/sumarios/"+this.props.id}><button>Back</button></Link>
                    </div>                
                }
                {(!this.state.sumDeleted || !this.state.classDeleted) && 
                    <div>
                        <BiLoader className="loader_ico"/>
                        <p>Loading...</p>
                    </div>
                }
                
            </div>
        )
    }
}
export default DeleteSumario
