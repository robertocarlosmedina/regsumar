import React from 'react';
import { Link } from 'react-router-dom'
import Api from '../api/api';
import './sumarioForm.css';

export default class SumarioEditForm extends React.Component{
    state={
        ano:"1º Ano",
        disciplina:1,
        presenca:"",
        curso:3,
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
        aula:[],
        duracao:"",
        emptyFild:false, // to validat if the fiel is empty or not
    }
    constructor(props){
        super()
        Api.get('disciplina/edicao').then(res =>{
            this.setState({ disciplinas: res.data })
        })
        Api.get('/curso').then(res=>{
            this.setState({ cursos: res.data })
        })
        Api.get('/auth/'+props.id).then(res=>{
            this.setState({ docente: res.data[0].name })
        })  
    }


    duracaoCalcum = ()=> {
        const start = this.state.horaInicio.split(":")
        const end  = this.state.horaFim.split(":")
        var startTime = parseInt(start[0])*60+parseInt(start[1])
        var endTime = parseInt(end[0])*60+parseInt(end[1])
        var diff = endTime - startTime
        var minutes = diff/60


        if(minutes === "NaN" || minutes === undefined)
            return ''
        else if(minutes < 1){
            return (minutes*60)*-1+"mn"
        }
        return minutes*60
    
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

    docenteChangeHandler = (event) =>{
        this.setState({ docente: event.target.value })
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

    localChangeHandler = (event) =>{
        this.setState({ local: event.target.value })
    }

    horaInicioChangeHandler = (event) =>{
        this.setState({ horaInicio: event.target.value })
        if(this.state.horaFim !== ""){
            this.setState({ duracao: this.duracaoCalcum()})
        }
    }

    horaFimChangeHandler = (event) =>{
        this.setState({ horaFim: event.target.value })
        if(this.state.horaInicio !== ""){
            this.setState({ duracao: this.duracaoCalcum()})
        }
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
             this.state.disciplina === "" || this.state.docente === "" || this.state.presenca === ""
           || this.state.aulaNr === ""  || this.state.diaSemana === "" || this.state.local === "" || this.state.tipoAula === ""){
            this.setState({ emptyFild: true })
        }
        else{
            try{
                const res = await Api.post("/class/create", {
                    numero:this.state.aulaNr, 
                    tipo:this.state.tipoAula,
                    diaSemana:this.state.diaSemana,
                    local:this.state.local,
                    duracao:this.state.duracao,
                    disciplina: this.state.disciplina
                })
                this.setState({ aula: res.data })
                if(Object.entries(this.state.aula).length !== 0){
                    this.props.onChangeNew( {
                        presenca:this.state.presenca,
                        conteudo:this.state.sumario,
                        biblio:this.state.biblio,
                        idaula:this.state.aula[0].idaula,
                    })
                }
            }catch(error){
                console.log(error.message)
            }
        }
    }

    render(){
        return(
            <form /*onSubmit={submitHandler}*/>
                
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
                        {this.state.disciplinas.filter(disciplina => parseInt(disciplina.idcurso) === parseInt(this.state.curso)).map((disciplina, i)=>
                        (
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
                        value={this.state.docente} 
                        onChange={this.docenteChangeHandler}
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
                            <option value="Teorica">Teorica</option>
                            <option value="Pratica">Pratica</option>
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
                {this.state.emptyFild && <p className="empty_alert">There are some empty field</p>}          
                <div className="new-sumario__actions">
                    <Link to={"/homepage/start/"+this.props.id}><button type="submit" className="cancel">Cancel</button></Link>
                    <button type="submit" onClick={this.submitHandler} className="save" >Save</button>
                </div>
            </form>
        )
    }
}