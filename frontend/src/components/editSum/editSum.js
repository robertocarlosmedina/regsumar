import React from 'react';
import { Link} from 'react-router-dom'
import { BiLoader } from 'react-icons/bi'

import Card from '../UI/card'
import SaveChange from './saveChanges';

import Api from '../api/api';


export default class SumarioEdit extends React.Component{
    state={
        ano:"",
        disciplina:1,
        presenca:"",
        curso:1,
        docente:"",
        aulaNr:"",
        tipoAula:"Teórico",
        data:"",
        sumario:"",
        diaSemana:"",
        biblio:"",
        horaInicio:"",
        local:"",
        horaFim:"",
        disciplinas:[],
        cursos:[],
        // to control the save of the changes
        saved:false,
        saved1:false,
        startSave:false,
    }
    constructor(props){
        super()
        Api.get('/disciplina/edicao').then(res =>{
            this.setState({ disciplinas: res.data })  
        })
        Api.get('/curso').then(res=>{
            this.setState({ cursos: res.data })
        })
        Api.get('/class/'+props.classId).then(res =>{
            this.initializeClassElements(res.data[0])
        })
        Api.get('/auth/'+props.id).then(res=>{
            this.setState({ docente: res.data[0].name })
        })  
        Api.get('/sumario/'+props.sumId).then(res =>{
            this.initializeSumElements(res.data[0])
        })
        
    }

    initializeSumElements = (sumario) =>{
        this.setState({ sumario: sumario.conteudo })
        this.setState({ biblio: sumario.biblio })
        this.setState({ presenca: sumario.presenca })
    }

    initializeClassElements = (classInfo) =>{
        this.setState({ aulaNr: classInfo.numero })
        this.setState({ local: classInfo.local })
        this.setState({ horaInicio: classInfo.hora })
        this.setState({ duracao: classInfo.duracao})
        
        this.setState({ disciplina: classInfo.disciplina})

        // to add the data
        const dataInput = classInfo.data
        if(dataInput) {  
            const formatedData =  dataInput.toString()
            this.setState({ data:formatedData.substr(0, 10) }) 
            let semana = ['Domingo','Segunda-Feira','Terça-Feira','Quarta-Feira','Quinta-Feira','Sexta-Feira', 'Sábado'];
            let teste = new Date(formatedData);
            let dia = teste.getDay();
            this.setState({ diaSemana: semana[dia+1] })
        }

        // to set the end time
    }

    anoChangeHandler = (event) => {
        this.setState({ ano: event.target.value })
    }

    cursoChangeHandler = (event) =>{
        this.setState({ curso: event.target.value })
    }

    nrAulaChangeHandler = (event) =>{
        this.setState({ aulaNr: event.target.value })
    }

    presencaChangeHandler = (event) =>{
        this.setState({ presenca: event.target.value })
    }

    disciplinaChangeHandler = (event) =>{
        this.setState({ disciplina: event.target.value })
    }

    tipoAulaChangeHandler = (event) =>{
        this.setState({ tipoAula: event.target.value })
    }

    dataChangeHandler = (event) =>{
        this.setState({ data: event.target.value })
        let semana = ['Domingo','Segunda-Feira','Terça-Feira','Quarta-Feira','Quinta-Feira','Sexta-Feira', 'Sábado'];
        let teste = new Date(event.target.value);
        let dia = teste.getDay();
        this.setState({ diaSemana: semana[dia+1] })
    }

    docenteHandler = (event) =>{
        this.setState({ docente: event.target.value })
    }

    localChangeHandler = (event) =>{
        this.setState({ local: event.target.value })
    }

    horaInicioChangeHandler = (event) =>{
        this.setState({ horaInicio: event.target.value })
    }

    horaFimChangeHandler = (event) =>{
        this.setState({ horaFim: event.target.value })
    }

    sumarioChangeHandler = (event) =>{
        this.setState({ sumario: event.target.value })
    }

    biblioChangeHandler = (event) =>{
        this.setState({ biblio: event.target.value })
    }

    submitHandler = async (event) =>{
        event.preventDefault() // o submit não e enviado um pedido para nenhum servidor
        if(this.state.tipoAula === "" || this.state.data === "" || this.state.sumario === "" || this.state.data === "" ||
            this.state.disciplina === "" || this.state.docente === ""
           || this.state.aulaNr === ""  || this.state.diaSemana === "" || this.state.local === "" || this.state.tipoAula === ""){
            this.setState({ emptyFild: true })
        }
        else{
            this.setState({ startSave: true})
            try{
                Api.put("/class/edit/"+this.props.classId, {
                    numero:this.state.aulaNr, 
                    tipo:this.state.tipoAula,
                    diaSemana:this.state.diaSemana,
                    local:this.state.local,
                    duracao:this.state.horaFim,
                    disciplina: this.state.disciplina
                }).then(res=>{
                    if (res.data){ 
                        this.setState({ saved: true})
                    }
                })
            
                Api.put("/sumario/edit/"+this.props.sumId, {
                    conteudo:this.state.sumario,
		            biblio:this.state.biblio,
		            presenca:this.state.presenca, 
		            idaula:this.props.classId,
                }).then(res=>{
                    if (res.data){ 
                        this.setState({ saved1: true})
                    }
                })

            }catch(error){
                console.log(error.message)
            }
        }
    }

    render(){
        return(
            <div>
                {!this.state.startSave &&
                    <Card className="sumario_new">
                        <form >
                           <ul className="new-sumario__controls">
                               <li className="new-sumario__control">
                                   <p><label>Ano</label></p>
                                   <select onChange={this.anoChangeHandler}  className="small_select">
                                       <option value="1º Ano">1º Ano</option>
                                       <option value="2º Ano">2º Ano</option>
                                       <option value="3º Ano">3º Ano</option>
                                       <option value="4º Ano">4º Ano</option>
                                   </select>
                               </li>
                               <li className="new-sumario__control">
                               <p><label>Curso</label></p>
                               <select onChange={this.cursoChangeHandler} className="large_select">
                                   {this.state.cursos.map((curso, i)=>(
                                       <option value={curso.id} key={i}>{curso.nome}</option>
                                   )
                                   )}
                               </select>
                               </li>
                               <li className="new-sumario__control">
                               <p><label>Número aula</label></p>
                               <input 
                                   type="number" 
                                   value={this.state.aulaNr} 
                                   onChange={this.nrAulaChangeHandler}
                                   className="small_input"
                               />
                               </li>
                               <li className="new-sumario__control">
                                   <p><label>Hora inicio</label></p>
                                   <input 
                                       type="time" 
                                       value={this.state.horaInicio} 
                                       onChange={this.horaInicioChangeHandler}
                                       className="small_input"
                                   />
                               </li>
                               <li className="new-sumario__control">
                                   <p><label>Disciplina</label></p>
                                   <select onChange={this.disciplinaChangeHandler}  className="large_select">
                                       {this.state.disciplinas.filter(disciplina => parseInt(disciplina.idcurso) === parseInt(this.state.curso)
                                            ).map((disciplina, i)=>(
                                           <option value={disciplina.edicaoInfo[0].idEdicao} key={i}>
                                               {disciplina.nome}
                                           </option>
                                       )
                                   )}
                                   </select>
                               </li>            
                                       
                               <li className="new-sumario__control">
                                   <p><label>Docente</label></p>
                                   <input 
                                       type="Text" 
                                       onChange={this.docenteHandler}
                                       value={this.state.docente}
                                       className="normal_input"
                                   />
                               </li>        
                               <li className="new-sumario__control">
                                   <p><label>Hora fim</label></p>
                                   <input 
                                       type="time" 
                                       value={this.state.horaFim} 
                                       onChange={this.horaFimChangeHandler}
                                       className="small_input"
                                   />
                               </li>                        
                               <li className="new-sumario__control">
                                   <p><label>Data</label></p>
                                   <input 
                                       type="date" 
                                       value={this.state.data} 
                                       onChange={this.dataChangeHandler}
                                       className="normal_input"
                                   />
                               </li>              
                               <li className="new-sumario__control">
                                   <p><label>Tipo aula</label></p>
                                   <select onChange={this.tipoAulaChangeHandler}  className="small_select">
                                           <option value="Pratica">Pratica</option>
                                           <option value="Teorica">Teorica</option>
                                       </select>
                               </li>
                               <li className="new-sumario__control">
                               <p><label>Alunos Presentes</label></p>
                               <input 
                                   type="number" 
                                   value={this.state.presenca} 
                                   onChange={this.presencaChangeHandler}
                                   className="small_input"
                               />
                               </li>
                               <li className="new-sumario__control">
                                       <p><label>Sala</label></p>
                                       <input 
                                           type="text" 
                                           value={this.state.local} 
                                           onChange={this.localChangeHandler}
                                           className="small_input"
                                       />
                                   </li>
                               <li className="new-sumario__control">
                                   <p><label>Sumario</label></p>
                                   <textarea 
                                       value={this.state.sumario} 
                                       onChange={this.sumarioChangeHandler}
                                       className="large_input"
                                       placeholder="Write your sum..."
                                   />
                               </li>
                               <li className="new-sumario__control">
                                   <p><label>Bibliografia</label></p>
                                   <textarea 
                                       value={this.state.biblio} 
                                       onChange={this.biblioChangeHandler}
                                       className="normal_input biblio"
                                       placeholder="Write your biblio..."
                                   />
                               </li> 
                               </ul> 
                               {this.state.emptyFild && <p className="empty_alert">There is some empty field<br />
                                                        Note: It can be the selection boxes try to reselect them.</p>}             
                               <div className="new-sumario__actions">
                                   <Link to={"/homepage/"+this.props.role+"/sumarios/"+this.props.id}>
                                       <button type="submit" className="cancel">Cancel</button>
                                    </Link>
                                   <button type="submit" onClick={this.submitHandler} className="save" >Edit</button>
                               </div>
                        </form>
                    </Card>}
            {(!this.state.saved || !this.state.saved1) && this.state.startSave &&
                <div>
                    <BiLoader className="loader_ico"/>
                    <p>Loading...</p>
                </div>}
            {this.state.saved   && this.state.saved1 && 
                <SaveChange id={this.props.id} 
                            sumId={this.props.sumId}
                            classId={this.props.classId}
                            role={this.props.role}
                />}
            </div>
        )
    }
}