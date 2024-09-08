import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {

  const [divisas, setDivisa] = useState([]);
  const [origin, setOrigin] = useState("");
  const [destiny, setDestiny] = useState("");
  const [quantity, setQuantity] = useState("");
  const [verifier, setVerifier] = useState(false);
  const [currencies, setCurrencies] = useState([]);
  const [finalResult, setResult] = useState(0);

  useEffect(() => {
    async function obtenerNombresDivisas() {
      const axiosResponse = await axios.get('https://currency-converter-pro1.p.rapidapi.com/latest-rates', {
        params: { base: "USD" },
        headers: {
          'x-rapidapi-key': '2cc504gt54dw8f254', //Modificada por seguridad
          'x-rapidapi-host': 'currency-converter-pro1.p.rapidapi.com'
        }
      })
      setDivisa(axiosResponse.data.result)

    }
    //obtenerNombresDivisas();
  }, [])


  console.log(divisas);

  const handleOrigin = (e) => {
    setResult(0);
    setOrigin(e.target.value);
  }
  const handleDestiny = (e) => {
    setResult(0);
    setDestiny(e.target.value);
  }
  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  }

  const targetValue = (origin, destiny, quantity) => {

    console.log(quantity);
    if (origin.length == 3 && destiny.length == 3) {
      if (/^\d+(\.\d+)?$/.test(quantity)) {
        async function obtenerConversion() {
          const axiosResponse = await axios.get('https://currency-converter-pro1.p.rapidapi.com/latest-rates', {
            params: { base: origin },
            headers: {
              'x-rapidapi-key': '2cc5021f2cmsh928421a24af316fp188f44jsn69ce79c8f254',
              'x-rapidapi-host': 'currency-converter-pro1.p.rapidapi.com'
            }
          })
          setCurrencies(axiosResponse.data.result)
        }
        obtenerConversion();
      } else {
        setVerifier(true);
      }
    } else {
      setVerifier(true);
    }
  }

  useEffect(() => {

    for (const currency in currencies) {
      if (currency == destiny) {

        console.log(typeof (currencies[currency]));
        const floatQuantity = parseFloat(quantity);


        const result = floatQuantity * currencies[currency];
        console.log(result);
        setResult(result.toFixed(2));
      }
    }

  }, [currencies])


  return (
    <>
      <div className='contenedor'>

        <h1>Conversor de divisas</h1>

        <div className='selector'>
          <div className='Origen'>
            <h3>Moneda Origen</h3>
            <select onChange={handleOrigin}>
              <option selected>Seleccione Divisa</option>
              {
                Object.keys(divisas).map((divisa) =>(
                  <option value={divisa}>{divisa}</option>
                ))
              }
            </select>
          </div>
          <div className='Destino'>
            <h3>Moneda Destino</h3>
            <select onChange={handleDestiny}>
              <option selected>Seleccione Divisa</option>
              {
                Object.keys(divisas).map((divisa) =>(
                  <option value={divisa}>{divisa}</option>
                ))
              }
            </select>
          </div>
        </div>

        <div className='cantidadOrigen'>
          <input type='text' placeholder='Cantidad a convertir' className='cuadroCantidad' onChange={handleQuantity} />
          <button className='botonConvertir' onClick={() => targetValue(origin, destiny, quantity)}>Convertir</button>
        </div>

        <div className='resultado'>
          {verifier && <h3>Procure rellenar/seleccionar todos los campos</h3>}
          {finalResult != 0 ? <h3>{quantity}<span className='resaltado'>{origin}</span> son {finalResult}<span className='resaltado'>{destiny}</span></h3> : <h3>Su conversión aparacerá aquí</h3>}
        </div>

      </div>
    </>
  )
}

export default App
