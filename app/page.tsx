"use client"

import React, {useState, useEffect} from 'react'
const axios = require('axios').default;

function Home() {
  const urlcurso = 'https://pcn662vet2.execute-api.us-east-1.amazonaws.com/dev/curso'
  const urldisc  = 'https://pcn662vet2.execute-api.us-east-1.amazonaws.com/dev/disciplinas_por_curso/'

  type Curso = {} 
  type GetCursoResponse = {  }  

  type Disciplina = {}
  type GetDisciplinaResponse = {  }
  
  return <>  

       </>  
}

export default Home;