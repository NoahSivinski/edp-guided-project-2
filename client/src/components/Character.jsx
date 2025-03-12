import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Character = (props) => {

    const navigate = useNavigate();
    const [characterData, setCharacterData] = useState({});
    const [homeworld, setHomeworld] = useState({});
    const [filmsData, setFilmsData] = useState([]);
    const { id } = useParams();

    // const { character } = location.state || {};
    // const planetUrl = `http://localhost:3000/api/planets/${character.homeworld}`;

    useEffect(() => {
        const fetchCharacterData = async () => {
            try {
                const baseUrl = import.meta.env.VITE_CHARACTER_API_URL;
                //console.log('Character base url: ', baseUrl)
                const characterUrl = `${baseUrl}/${id}`;
                //console.log(characterUrl);
                const response = await fetch(characterUrl);
                if (!response.ok) {
                    throw new Error('Data could not be fetched!');
                }
                //console.log(response);
                const json_response = await response.json();
                //console.log('Character data: ', json_response);
                setCharacterData(json_response[0]);
                //console.log('Character name: ', characterData.name)
            } catch (error) {
                console.error('Error fetching character:', error);
            }
        };
        fetchCharacterData();
        console.log(`Character name: ${characterData.name}`)

        const fetchHomeworld = async () => {
            try {
                const baseUrl = import.meta.env.VITE_PLANET_API_URL;
                const url = `${baseUrl}/${id}`;
                const response = await fetch(url);
                //console.log(response);
                const data = await response.json();
                //console.log(data);
                setHomeworld(data[0]);
                //console.log(homeworld);
            } catch (error) {
                console.error('Error fetching homeworld:', error);
            }
        };

        const fetchFilms = async () => {
            try {
                const baseUrl = import.meta.env.VITE_CHARACTER_API_URL;
                const url = `${baseUrl}/${id}/films`;
                console.log(url);
                const response = await fetch(url);
                console.log(response);
                const data = await response.json();
                setFilmsData(data);
                console.log(filmsData);
            } catch (error) {
                console.error('Error fetching films: ', error);
            }
        };

        if (characterData) {
            fetchHomeworld();
            fetchFilms();

        }
    }, [id]);

    const handleFilmButtonClick = (film) => {
        navigate(`/film/${film.id}`);
    };

    const handlePlanetButtonClick = (homeworld) => {
        navigate(`/planet/${homeworld.id}`);
    };

    return (
        <>
            <main>
                <h1 id="name">{characterData.name}</h1>
                <section id="generalInfo">
                    <p>Height: {characterData.height} cm</p>
                    <p>Mass: {characterData.mass} kg</p>
                    <p>Born: {characterData.birth_year}</p>
                </section>
                <section id="planets">
                    <h2>Homeworld</h2>
                    <p><button onClick={() => handlePlanetButtonClick(homeworld)}>{homeworld.name}</button></p>
                </section>
                <section id="films">
                    <h2>Films appeared in</h2>
                    {filmsData.map(film => (<button key={film.id} onClick={() => handleFilmButtonClick(film)}>{film.title}</button>))}
                </section>

            </main >
        </>
    );
};

export default Character;