import { useState } from "react";
import { Resultados } from "./Resultados";

export function Body() {

    const [resultado, setResultado] = useState("");
    const [texto, setTexto] = useState("");    

    const manejarBusqueda = (e) =>{

        const res = e.key;   

        if(/[a-zA-Z0-9\s]/.test(res) && res.length == 1){
            setResultado((textoPrev) => textoPrev + res)
            console.log(resultado)
        }else if(res == "Enter"){
            console.log("Presionado enter")
            setTexto(resultado);
            setResultado("")            
        }
        
    }

    return (
        <>
            <div className="cuadroBusqueda">
                <input className="inputBusqueda" type="text" placeholder="Vídeo a Buscar" onKeyDown={manejarBusqueda}/>
            </div>

            <div className="multimedia">
                    <Resultados resultado={texto}/>
            </div>

        </>
    );
}