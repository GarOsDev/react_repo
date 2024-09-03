import axios from "axios";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";

export function Resultados({ resultado }) {

    const url = 'https://www.googleapis.com/youtube/v3/search';
    const key = "AIcwWc" // Modificado por seguridad
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);


    useEffect(() => {
        async function listaVideos() {
            const response = await axios.get(url, {
                params: {
                    part: 'snippet',
                    maxResults: 5,
                    q: resultado,               // Término de búsqueda
                    type: 'video',
                    key: key,
                },
            });

            setVideos(response.data.items)
            console.log(response)
        }

        if (resultado) { listaVideos(); }

    }, [resultado])

    const playSelectedVideo = (video) => {
        setSelectedVideo(video)
    }

    return (
        <div className="videosEncontrados">
            <h2>Resultados de Búsqueda</h2>
            <div className="reproductorResultados">

                {selectedVideo ? (
                    <div className="reproductor">
                        <h3>{selectedVideo.snippet.title}</h3>
                        <ReactPlayer
                        className="ReproductorReact"
                            url={`https://www.youtube.com/watch?v=${selectedVideo.id.videoId}`}
                            playing
                            controls
                        />
                        <button className="botonCerrar" onClick={() => setSelectedVideo(null)}>Cerrar</button>
                    </div>
                ) : ""}

                <ul className="listaResultados">
                    {videos.map((video) => (
                        <li key={video.id.videoId}>
                            <h3>{video.snippet.title}</h3>
                            <img src={video.snippet.thumbnails.medium.url} // URL de la carátula del video
                                alt={video.snippet.title}
                                onClick={() => playSelectedVideo(video)} />
                        </li>
                    ))}
                </ul>

            </div>

        </div>
    );
}