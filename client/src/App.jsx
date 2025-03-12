import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from 'react-router-dom';
import Home from './components/Home';
import Character from './components/Character';
import Film from './components/Film';
import Planet from './components/Planet';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/character/:id" element={<Character />} />
          <Route path="/film/:id" element={<Film />} />
          <Route path="/planet/:id" element={<Planet />} />
        </Routes>
      </Router>
    </>
  )
}
export default App