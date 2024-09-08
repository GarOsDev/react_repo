import CanvasJSReact from '@canvasjs/react-charts';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export function Resultados() {

  const contenido = {
    "fechas": [],
    "valores": []
  }

  const imcs = (contenido) => {

    for (let i = 0; i < localStorage.length; i++) {
      const fecha = localStorage.key(i);
      const valor_imc = localStorage.getItem(fecha);

      contenido.fechas.push(fecha);
      contenido.valores.push(parseFloat(valor_imc));
    }

    return contenido;
  }

  imcs(contenido);

  const dataPoints = contenido.fechas.map((fecha, index) => ({
    label: fecha,
    y: contenido.valores[index]
  }));

  const options = {
    title: {
      text: "Your BMI's records"
    },
    data: [{
      type: "column",
      dataPoints: dataPoints
    }]
  }

  return (
    <div className="grafico">
      <h2>Histórico Resultados</h2>
      <div className="graph">
        <CanvasJSChart options={options} />
      </div>

    </div>
  );


}