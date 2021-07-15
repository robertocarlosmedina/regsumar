import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { BiCalendarWeek } from 'react-icons/bi'
import { GiDuration } from 'react-icons/gi'
import { AiOutlineClockCircle }from 'react-icons/ai'
import axios from 'axios'
import { TiGroup } from 'react-icons/ti'

import DataFormat from './Data'
import './sumario.css'

const api = axios.create({
    baseURL:`http://localhost:3001/`
})


class Sumario extends Component{
    state = {
        sumario:[],
        class:[],
        disciplina:[],
    }
    
    constructor(props){
        super()
        api.get('sumario/'+props.idSumario).then(res =>{
          // console.log(res.data)
            this.setState({ sumario: res.data })
        })  
        api.get('class/'+props.idClass).then(res =>{
          this.setState({ class: res.data })
        }) 
        api.get('disciplina').then(res =>{
          this.setState({ disciplina: res.data })
        })
    }

    render() {
        return(
          <div className="sumario_info">
              <h1>Conteudo Abordado</h1>
              {this.state.sumario.map((sum, i) => (
                <div key={i}>
                  <p>{sum.conteudo}</p>
                  {sum.biblio !==null && <div><h2>Bibliografia</h2><p>{sum.biblio}</p></div>}
                  
                  {this.state.class.map((clss, i) => (
                  <div key={i}>
                    <ul className="list_sumInfo">
                      <li>
                        <div className="display_presenca">
                              <TiGroup className="ico_show"/>
                              {sum.presenca !== null && <p>{sum.presenca}</p>}
                              {sum.presenca === null && <p>{0}</p>}
                        </div>
                      </li>
                      <li >
                        <div>
                          <DataFormat data={new Date(clss.data.substring(0, 10))}/>
                        </div>
                      </li>
                      {clss.diaSemana !== "" &&
                      <li>
                        <div className="more_caracter_control">
                          <BiCalendarWeek className="ico_show"/>
                          <p>{clss.diaSemana}</p>
                        </div>
                      </li>
                      }
                      {clss.duracao !== "" && <li>
                        <div>
                          <GiDuration className="ico_show" />
                          <p>{clss.duracao}</p>
                        </div>
                      </li>
                      }
                      <li>
                        <div>
                          <AiOutlineClockCircle className="ico_show"/>
                          <p>{clss.hora}</p>
                        </div>
                      </li>
                      { clss.sala !==undefined && <li>
                        <div>
                          <p>Sala</p>
                          <p>{clss.local}</p>
                        </div>
                      </li>}
                    </ul>
                    {this.state.disciplina.map((disc, i) => {
                      if(disc.id === clss.disciplina){
                        return  (
                          <div key={i}>
                            <h2>Disciplina</h2>
                            <p>{disc.nome}</p>
                          </div>
                          )
                        }
                      })
                    }
                  </div>
                  ))}
                </div>
              ))}
              <ul className="buttons_control">
                {this.props.role !=="Estudantes" &&
                <li>
                  <Link to={"/homepage/"+this.props.role+"/deleteSum/"+this.props.id+"/"+this.props.idSumario+"/"+this.props.idClass}>
                    <button className="delete">Delete</button>
                  </Link>
                </li>
                }
                <li>
                  <Link to={"/homepage/"+this.props.role+"/sumarios/"+this.props.id} >
                    <button className="back">Back</button>
                  </Link>
                </li>
                { this.props.role !=="Estudantes" &&
                <li>
                  <Link to={"/homepage/"+this.props.role+"/editSum/"+this.props.id+"/"+this.props.idSumario+"/"+this.props.idClass}>
                    <button className="edit">Edit</button>
                  </Link>
                </li>
                }
              </ul>
          </div>
        )
    }
}
export default Sumario;