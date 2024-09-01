import axios from "axios";
import { useEffect, useState } from "react";

export function Resultados({ resultado }) {

    const url = 'https://www.googleapis.com/youtube/v3/search';

    const [videos, setVideos] = useState([]);


    useEffect(() => {
        async function listaVideos() {
            const response = await axios.get(url, {
                params: {
                    part: 'snippet',        
                    maxResults: 5,          
                    q: resultado,               // Término de búsqueda
                    type: 'video',          
                    key: "",           
                },
            });

            setVideos(response.data.items)
        }

        if (resultado) { listaVideos(); }

    }, [resultado])

    return (
        <div>
            <h2>Resultados de Búsqueda</h2>
            <ul>
                {videos.map((video) => (
                    <li key={video.id.videoId}>
                        <h3>{video.snippet.title}</h3>
                        <img src={video.snippet.thumbnails.medium.url} // URL de la carátula del video
                            alt={video.snippet.title}
                            width="auto" />
                    </li>
                ))}
            </ul>
        </div>
    );
}