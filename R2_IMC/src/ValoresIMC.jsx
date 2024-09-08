import React, { useState } from 'react';
import { Resultados } from "./Resultados";

export function ValoresIntroducidos() {

    const [peso, setPeso] = useState(0);
    const [altura, setAltura] = useState(0);
    const [fechas, setFecha] = useState([]);
    const [notificacion, setNotificacion] = useState(false);
    const [notificacionMetos, setNotificacionMetros] = useState(false);
    

    const fecha = new Date();
    const fechaActual = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;

    const resultadoHandler = () => {
        if (!isNaN(peso) && !isNaN(altura)) {
            if (altura.includes(".")) {
                setNotificacionMetros(true)
            } else {
                const calculoIMC = parseFloat(peso) / Math.pow((parseInt(altura) / 100), 2);
                localStorage.setItem(fechaActual, calculoIMC.toString());

                setFecha((fechaPrevia) => [...fechaPrevia,fechaActual]);  
                console.log(fechas)              
            }
        } else {
            setNotificacion(true)
        }
    }

    console.log(fechas);

    return (
        <div className="datos">
            <div className="valoresInput">
                <input className="peso" type="text" placeholder="Peso(Kg)" onChange={(e) => { setPeso(e.target.value); setNotificacion(false) }} />
                <input className="altura" type="text" placeholder="Altura(cm)" onChange={(e) => { setAltura(e.target.value); setNotificacion(false); setNotificacionMetros(false) }} />
                <button className="boton" onClick={resultadoHandler}>Calcular</button>

                {notificacion && (<div className="notificacion">Introduzca valores numericos!</div>)}
                {notificacionMetos && (<div className="notificacion">La altura debe ir en centímetros</div>)}
            </div>
            <div className="resultados">
                < Resultados/>
            </div>
        </div>
    )
}