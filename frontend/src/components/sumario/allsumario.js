import React, { Component } from 'react'
import { Link } from 'react-router-dom' 
import axios from 'axios'
import { TiGroup } from 'react-icons/ti'
import { BsReverseLayoutTextSidebarReverse } from 'react-icons/bs'

import './allsumario.css'

const api = axios.create({
    baseURL:`http://localhost:3001/`
})

class AllSum extends Component{
    
    state = {
        sumarios:[],
        class:[],
    }
    constructor(){
        super()
        api.get('sumario').then(res =>{
            this.setState({ sumarios: res.data })
        })
        api.get('class').then(res=>{
          this.setState({class:res.data})
        })       
    }

    render() 
      
      {
        return(
          <div className="all_sum">
              <ul className="sumario_list">
                {this.state.sumarios.map((sumario, i) => (
                  <li key={i} >
                    { i===0 && <div className="first_ones">
                      <h1>Sumario {i+1}</h1>
                      <h2>Conteudo</h2>
                      <h3>{sumario.conteudo.substring(0, 50)+"..."}</h3>
                      <div className="display_presenca">
                        <TiGroup className="ico_presenca"/> 
                        {sumario.presenca !== null && <p>{sumario.presenca}</p>}
                        {sumario.presenca === null && <p>{0}</p>}
                      </div>
                      <Link to={"/homepage/"+this.props.role+"/sumario/"+this.props.userId+"/"+sumario.idsumario+"/"+sumario.aula}>
                        <button>Open</button>
                      </Link>
                    </div>}
                    {i>0  && <div>
                      <h1>Sumario {i+1}</h1>
                      <h2>Conteudo</h2>
                      <h3>{sumario.conteudo.substring(0, 60)+"..."}</h3>
                      <div className="display_presenca">
                        <TiGroup className="ico_presenca"/>
                        {sumario.presenca !== null && <p>{sumario.presenca}</p>}
                        {sumario.presenca === null && <p>{0}</p>}
                      </div>
                      <Link to={"/homepage/"+this.props.role+"/sumario/"+this.props.userId+"/"+sumario.idsumario+"/"+sumario.aula}>
                        <button>Open</button>
                      </Link>
                    </div>}
                  </li>  
                ))}
              </ul>
              {Object.entries(this.state.sumarios).length === 0 &&
                <div className="empty_list">
                  <BsReverseLayoutTextSidebarReverse className="ico_empty"/>
                  <p>There is no Sum to show...</p>
                </div>
              }
          </div>
        )
    }

}
export default AllSum;