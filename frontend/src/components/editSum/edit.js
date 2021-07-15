import React from 'react'

import Api from '../api/api'

import SumarioEditForm from './editSum'

function EditSum(props) {

    async function newSaveSumarioHandler(sumInfo){

        try{

            Api.post("/sumario/create", {
                    conteudo:sumInfo.conteudo,
		            biblio:sumInfo.biblio,
		            presenca:sumInfo.presenca, 
		            idaula:sumInfo.idaula,
            }).then(res=>{})
        }catch (error){
            console.log(error.message)
        } 
    }

    return (
        <div>
            <SumarioEditForm onChangeNew={newSaveSumarioHandler} 
                             id={props.id} 
                             classId={props.classId} 
                             sumId={props.sumId}
                             role={props.role}
            />
        </div>
    )
}

export default EditSum