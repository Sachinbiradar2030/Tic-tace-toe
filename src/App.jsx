import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Icon from './Icon/Icon'
import Grid from './Components/Grid/Grid'
import Card from './Components/Card/Card'
import { BiColor } from 'react-icons/bi'

function App() {
  

  return (
    <>
    <h1 style={{color:'white'}}>Tic Tac Toe</h1>
     <Grid numberOfCards={9}/>
    
    </>
  )
}

export default App
