import React from 'react'
import { BsBook } from 'react-icons/bs'

import Navbar from '../navbar/Navbar'
import AllSum from '../sumario/allsumario'
import DeleteSum from '../sumario/deleteSumario'
import Newsumario from '../newSum/newSumario'
import EditSum from '../editSum/edit'
import Sumario from '../sumario/sumario'
import Settings from '../settings/setting'
import Card from '../UI/card'
import Menu from '../menu/menu'
import Api from '../api/api' 


import './style.css'


class Homepage extends React.Component{

    state={
        user:"",
    }
    
    constructor(props){
        super()
        Api.get("/auth/"+props.match.params.id).then(res =>{
            this.setState({ user: res.data[0] })
        })
    }

    render(){
        return (
            <div className="homepage">
                <Menu id={this.props.match.params.id} role={this.props.match.params.role}/>
                <Navbar userName={this.state.user.name}/> 
                <div className="test">
                    <Card className="home_content">
                        {this.props.match.params.child === "start" && <div>
                                <BsBook  className="ico_book"/>
                                <p>Control all your sum by this app.</p>
                        </div>}
                        {this.props.match.params.child === "sumarios" && 
                                <AllSum  userId={this.props.match.params.id} 
                                         role={this.props.match.params.role}/>
                        }
                        {/* passing all the params as a props to the sumario class */}
                        {this.props.match.params.child === "sumario" &&
                            <Sumario id={this.props.match.params.id} 
                                     idSumario={this.props.match.params.sumId}
                                     idClass = {this.props.match.params.classId}
                                     role={this.props.match.params.role}
                            />
                        }
                        {this.props.match.params.child === "deleteSum" &&
                            <DeleteSum id={this.props.match.params.id}
                                     idSumario={this.props.match.params.sumId}
                                     idClass={this.props.match.params.classId}
                                     role={this.props.match.params.role}                            
                            />
                        }
                        {this.props.match.params.child === "newSumario" &&
                            <Newsumario id={this.props.match.params.id} 
                                        role={this.props.match.params.role}
                            />
                        }
                        {this.props.match.params.child === "editSum" &&
                            <EditSum id={this.props.match.params.id} 
                                     classId={this.props.match.params.classId} 
                                     sumId={this.props.match.params.sumId}
                                     role={this.props.match.params.role}
                            />
                        }
                        {this.props.match.params.child === "settings" &&
                            <Settings id={this.props.match.params.id} 
                                      userInfo={this.state.user}
                            />
                        }
                    </Card> 
                </div>              
            </div>
        )
    }
}

export default Homepage;
