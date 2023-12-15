"use client"

import React, {useState, useEffect} from 'react'
const axios = require('axios').default;

function Home() {
  const urlcurso = 'https://pcn662vet2.execute-api.us-east-1.amazonaws.com/dev/curso'
  const urldisc  = 'https://pcn662vet2.execute-api.us-east-1.amazonaws.com/dev/disciplinas_por_curso/'

  type Curso = {id_curso:number, id_instituicao:number, id_tipo_curso: number, tx_descricao: string} 
  type GetCursoResponse = { data: { data: Curso [] } }  
  const [ idCurso, setIdCurso ]  = useState('-1')  
  const [ cursos, setCursos ]  = useState<Curso []>([])
  const [ loadingCursos, setLoadingCursos ] = useState(true)      

  type Disciplina = {id_disciplina:number, id_tipo_disciplina: number, id_curso: number, tx_sigla: string, tx_descricao: string, in_periodo:number, in_carga_horaria:number}
  type GetDisciplinaResponse = { data: { data: Disciplina [] } }
  const [ disciplinas, setDisciplinas ]  = useState<Disciplina []>([])
  const [ loadingDisciplinas, setLoadingDisciplinas ] = useState(false)     
  
  useEffect(() => {              
    async function getCursos() {      
      await axios.get(urlcurso)
      .then((res: GetCursoResponse ) => {                  
          setCursos( res.data.data )
          setLoadingCursos( false )
          setLoadingDisciplinas( true ) // Disparando carregamento de disciplinas
      })
      .catch((error:any) => {
          return <h1>ERRO!!!! {error.message} </h1>      
      })
    }         
    
    getCursos()        
  }, []) 


  useEffect(() => {              
    async function getDisciplina() {      
      const url = urldisc.concat(idCurso)      
      await axios.get(url)
      .then((res: GetDisciplinaResponse ) => {                  
        setDisciplinas( res.data.data )
        setLoadingDisciplinas( false )
      })
      .catch((error:any) => {
          return <h1>ERRO!!!! {error.message} </h1>      
      })
    }         
    
    if (loadingDisciplinas)
      getDisciplina()
  }, [loadingDisciplinas]) 


  useEffect(() => {                  
    setLoadingDisciplinas(true)  // Disparando carregamento de disciplinas
  }, [idCurso])   

  let cont_striped_rows = 0
  let striped_bg = 'bg_neutral'
  if (loadingCursos || loadingDisciplinas ) 
    return <div className='w-full text-center'> 
             <button type="button" className="bg-green-400 text-center" disabled>
               <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"/>                            
               CARREGANDO...
             </button>                   
           </div>
  else
    return <>  
             <div className='text-center font-bold text-xl'> MESTRE DETALHE: DISCIPLINAS X CURSO </div>
             <div className='h-10'/>
             <div className='text-center font-bold text-lg'> CURSO </div>             
             <center>
               <select value={idCurso} onChange={ (e) => setIdCurso(e.target.value) } >
                <option value="-1"> -- SELECIONE -- </option>
                {
                  cursos.map( (curso: Curso) => {
                               return <option value={curso.id_curso}> {curso.tx_descricao} </option>
                             }) 
                }              
               </select>          
             </center>
  
             <div className='h-10'/>
             <div className='text-center font-bold text-lg'> DISCIPLINAS </div>
  
             <table className=" border-separate min-w-full text-sm font-light">
               <thead className="text-center font-medium bg-gray-400">
                 <tr>
                   <th className="px-6 py-4">ID</th>
                   <th className="px-6 py-4">Sigla</th>
                   <th className="px-6 py-4">Descrição</th>
                   <th className="px-6 py-4">Período</th>
                   <th className="px-6 py-4">Carga Horária</th>
                 </tr>
               </thead>
               <tbody>
                     {                              
                       disciplinas.map( (disciplina: Disciplina) => {
                        ++cont_striped_rows;
                        striped_bg = ((cont_striped_rows % 2) == 0) ? 'bg-white' : 'bg-neutral';
                        const fixed_format = ' transition duration-300  hover:bg-neutral-500'
                        const format_now = striped_bg + fixed_format
                        return <tr className={format_now}>
                                 <td className='text-center'> {disciplina.id_disciplina} </td>
                                 <td className='text-center'> {disciplina.tx_sigla} </td>
                                 <td> {disciplina.tx_descricao} </td>
                                 <td className='text-center'> {disciplina.in_periodo} </td>
                                 <td className='text-center'> {disciplina.in_carga_horaria} </td>                                                                                                          
                               </tr>
                      }) 
                     }  
               </tbody>
             </table>
         </>  
}

export default Home;