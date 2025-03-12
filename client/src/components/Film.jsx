import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const Film = (props) => {

    const location = useLocation();
    const navigate = useNavigate();
    const [filmData, setFilmData] = useState({});
    const [charactersData, setCharactersData] = useState([]);
    const [planetsData, setPlanetsData] = useState([]);
    const { id } = useParams();

    //const { film } = location.state || {};
    //const planetUrl = `http://localhost:3000/api/planets/${character.homeworld}`;

    useEffect(() => {

        const fetchFilmData = async () => {
            try {
                const baseUrl = import.meta.env.VITE_FILM_API_URL;
                const filmUrl = `${baseUrl}/${id}`;
                console.log(filmUrl);
                const response = await fetch(filmUrl);
                if (!response.ok) {
                    throw new Error('Data could not be fetched!');
                }
                console.log(response);
                const json_response = await response.json();
                console.log(json_response);
                if (Array.isArray(json_response) && json_response.length > 0) {
                    setFilmData(json_response[0]);
                } else {
                    console.error('Unexpected response format', json_response);
                }
            } catch (error) {
                console.error('Error fetching film:', error);
            }
        };
        fetchFilmData();


        const fetchCharacters = async () => {
            try {
                const baseUrl = import.meta.env.VITE_FILM_API_URL;
                const url = `${baseUrl}/${id}/characters`;
                console.log(url);
                const response = await fetch(url);
                console.log(response);
                const data = await response.json();
                console.log(data);
                setCharactersData(data);
                //console.log(homeworld);
            } catch (error) {
                console.error('Error fetching homeworld:', error);
            }
        };

        const fetchPlanets = async () => {
            try {
                const baseUrl = import.meta.env.VITE_FILM_API_URL;
                const url = `${baseUrl}/${id}/planets`;
                const response = await fetch(url);
                const data = await response.json();
                setPlanetsData(data);
            } catch (error) {
                console.error('Error fetching films: ', error);
            }
        };

        if (filmData) {
            fetchCharacters();
            fetchPlanets();

        }
    }, [id]);

    const handleCharacterButtonClick = (character) => {
        navigate(`/character/${character.id}`);
    };

    const handlePlanetButtonClick = (homeworld) => {
        navigate(`/planet/${homeworld.id}`);
    };

    return (
        <>
            <main>
                <h1 id="film">{filmData.title}</h1>
                <section id="generalInfo">
                    <p>Episode: {filmData.episode_id}</p>
                    <p>Producer: {filmData.producer}</p>
                    <p>Director: {filmData.director}</p>
                    <p>Release Date: {filmData.release_date}</p>
                    <p>Opening Crawl: {filmData.opening_crawl}</p>
                </section>
                <section id="characters">
                    <h2>Characters in Film</h2>
                    <ul>
                    {charactersData.map(character => (<button key={character.id} onClick={() => handleCharacterButtonClick(character)}>{character.name}</button>))}
                    </ul>
                </section>
                <section id="planets">
                    <h2>Planets in Film</h2>
                    <ul>
                    {planetsData.map(planet => (<button key={planet.id} onClick={() => handlePlanetButtonClick(planet)}>{planet.name}</button>))}

                    </ul>
                </section>
            </main >
        </>
    );
};

export default Film;