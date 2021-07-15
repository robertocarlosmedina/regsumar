import React from 'react'
import { Link } from 'react-router-dom'


const SaveChange = (props)  =>{

    return (
        <div>
            <div className="deleted_back">
                <p>The Sum was been changed.</p>
                <Link to={"/homepage/"+props.role+"/sumario/"+props.id+"/"+props.sumId+"/"+props.classId}><button>Back</button></Link>
            </div>                
        </div>
    )

}
export default  SaveChange
