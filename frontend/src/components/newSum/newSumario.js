import React, { useState } from 'react'
import { BiLoader } from 'react-icons/bi'

import Api from '../api/api'
import FormSumario from './sumarioForm'
import Card from '../UI/card'
import SaveNew from './addNew'

import './style.css'


function Newsumario(props) {
    const [waiting, setWaiting] = useState(false)
    const [added, setAdded] = useState(false)

    async function newSaveSumarioHandler(sumInfo){

        try{
            setWaiting(true)
            Api.post("/sumario/create", {
                    conteudo:sumInfo.conteudo,
		            biblio:sumInfo.biblio,
		            presenca:sumInfo.presenca, 
		            idaula:sumInfo.idaula,
            }).then(res=>{
                const newSumario = res.data
                if(newSumario){
                    setAdded(true)
                }
            })
        }catch (error){
            console.log(error.message)
        } 
    }

    return (
        <div>
            {!waiting && <Card className="sumario_new">
                            <FormSumario onChangeNew={newSaveSumarioHandler} id={props.id}/>
                        </Card>
            }
            {waiting && !added &&
                <div>
                    <BiLoader className="loader_ico"/>
                    <p>Loading...</p>
                </div>
            }
            {added && 
                <SaveNew id={props.id} role={props.role} />
            }
        </div>
    )
}

export default Newsumario
