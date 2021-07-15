import React from 'react'
import { Link } from 'react-router-dom'


const SaveNew = (props)  =>{

    return (
        <div>
            <div className="deleted_back">
                <p>The Sum was been added.</p>
                <Link to={"/homepage/"+props.role+"/sumarios/"+props.id}><button>Back</button></Link>
            </div>                
        </div>
    )

}
export default  SaveNew