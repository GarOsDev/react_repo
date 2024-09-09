import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import minusImage from './assets/minus.svg'
import plusImage from './assets/plus.svg'
import './App.css'

const Contador = () =>{

  const [value,setValue] = useState(0);

  const plusHandler = () =>{setValue(value + 1)}
  const minusHandler = () =>{setValue(value - 1)}

  return (
    <div style={{display:'flex',gap:25,justifyContent:"space-evenly",alignItems:"center",backgroundColor:"#7FA1C3",borderRadius:25}} className='contadorContenedor'>
      <img style={{width:100}} src={minusImage} onClick={minusHandler}/>
      <h1>{value < 0 ? <span style={{color:"#8C3061"}}>{value}</span> : <span style={{color:"#BEDC74"}}>{value}</span>}</h1>
      <img style={{width:100}} src={plusImage} onClick={plusHandler}/>
    </div>
  );

}

function App() {

  const arrayNumbers = () =>{

    const valores = [5,8,1,2.5,4,36,34.14,47,5,14,36,28,64,7.14];

    return (
      <p>{valores.map((val,idx) =>{
        return <span>&nbsp;{val}[{idx}]</span>
      })}</p>
    );
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>

      <div>
        <h3>My array numbers are:</h3>
        {arrayNumbers()}
      </div>

      <div>
        <Contador />
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
