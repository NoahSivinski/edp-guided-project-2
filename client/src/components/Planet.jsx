import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Planet = () => {

    const navigate = useNavigate();
    const [planetData, setPlanetData] = useState({});
    const [charactersData, setCharactersData] = useState([]);
    const [filmsData, setFilmsData] = useState([]);
    const { id } = useParams();

    useEffect(() => {

        const fetchPlanetData = async () => {
            try {
                const baseUrl = import.meta.env.VITE_PLANET_API_URL;
                const planetUrl = `${baseUrl}/${id}`;
                console.log(planetUrl);
                const response = await fetch(planetUrl);
                if (!response.ok) {
                    throw new Error('Data could not be fetched!');
                }
                console.log(response);
                const json_response = await response.json();
                console.log('TEST: ', json_response);
                console.log('TEST2: ', json_response[0]);

                setPlanetData(json_response[0]);
                if (Array.isArray(json_response) && json_response.length > 0) {
                    setPlanetData(json_response[0]);
                    //console.log(json_response[0])
                } else {
                    console.error('Unexpected response format', json_response);
                }
            } catch (error) {
                console.error('Error fetching planet:', error);
            }
        };
        fetchPlanetData();
        console.log('Planet data: ', planetData);


        const fetchCharacters = async () => {
            try {
                const baseUrl = import.meta.env.VITE_PLANET_API_URL;
                const url = `${baseUrl}/${id}/characters`;
                console.log(url);
                const response = await fetch(url);
                console.log(response);
                const data = await response.json();
                console.log(data);
                setCharactersData(data);
                console.log(charactersData);
            } catch (error) {
                console.error('Error fetching characters:', error);
            }
        };

        const fetchFilms = async () => {
            try {
                const baseUrl = import.meta.env.VITE_PLANET_API_URL;
                const url = `${baseUrl}/${id}/films`;
                console.log(url);
                const response = await fetch(url);
                const data = await response.json();
                console.log(data);
                setFilmsData(data);
                console.log('Films data: ', data);
            } catch (error) {
                console.error('Error fetching films: ', error);
            }
        };

        if (planetData) {
            fetchCharacters();
            fetchFilms();
        }
    }, []);

    const handleCharacterButtonClick = (character) => {
        navigate(`/character/${character.id}`);
    };

    const handleFilmButtonClick = (film) => {
        navigate(`/film/${film.id}`);
    };

    return (
        <>
            <main>
                <h1 id="planet">{planetData.name}</h1>
                <section id="generalInfo">
                    <p>Climate: {planetData.climate}</p>
                    <p>Surface Water: {planetData.surface_water}</p>
                    <p>Diameter: {planetData.diameter}</p>
                    <p>Rotation Period: {planetData.rotation_period}</p>
                    <p>Terrain: {planetData.terrain}</p>
                    <p>Gravity: {planetData.gravity}</p>
                    <p>Orbital Period: {planetData.orbital_period}</p>
                    <p>Population: {planetData.population}</p>
                </section>
                <section id="characters">
                    <h2>Characters in Planet</h2>
                    <ul>
                        {charactersData.map(character => (<button key={character.id} onClick={() => handleCharacterButtonClick(character)}>{character.name}</button>))}
                    </ul>
                </section>
                <section id="characters">
                    <h2>Planet in Films</h2>
                    <ul>
                        {filmsData.map(film => (<button key={film.id} onClick={() => handleFilmButtonClick(film)}>{film.title}</button>))}

                    </ul>
                </section>
            </main >
        </>
    );
};

export default Planet;