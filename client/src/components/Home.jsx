import { useEffect, useState } from "react";
import Character from "./Character";
import { useNavigate } from 'react-router-dom';
// import dotenv from 'dotenv';

// dotenv.config();

const Home = () => {
    const [characterData, setCharacterData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(import.meta.env.VITE_CHARACTER_API_SERVER);
            if (!response.ok) {
              throw new Error('Data could not be fetched!');
            }
            console.log(response);
            const json_response = await response.json();
            console.log(json_response);
            setCharacterData(json_response);
          } catch (error) {
            console.error('Error fetching characters:', error);
          }
        };
        fetchData();
      }, []);

    //   const renderCharacters = characters => {
    //     const divs = characters.map(character => {
    //       const el = document.createElement('div');
    //       el.addEventListener('click', () => goToCharacterPage(character.id));
    //       el.textContent = character.name;
    //       return el;
    //     })
    //     charactersList.replaceChildren(...divs)
    //   };

    const handleButtonClick = (character) => {
        navigate(`character/${character.id}`);
    }


    return (
        <>
       
            <main>
                <div>
                    <h1>Star Wars Universe Lookup</h1>
                    <label htmlFor="searchString">Who you looking for? <span className="small">(Regular expressions are cool
                        here)</span></label>
                    <input id="searchString" autoComplete="off" />
                </div>
                <div>
                    {characterData.map(character => (<button key={character.id} onClick={() => handleButtonClick(character)}>{character.name}</button>))}
                    <section id="charactersList">
                    </section>
                </div>
            </main>
        </>
    );
};

export default Home;