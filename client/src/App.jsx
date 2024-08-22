import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './Components/Pokemoncard';
import './index.css';

const App = () => {
    const [pokemons, setPokemons] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10');
            const pokemonPromises = result.data.results.map(async (pokemon) => {
                const res = await axios.get(pokemon.url);
                return res.data;
            });
            const pokemonData = await Promise.all(pokemonPromises);
            setPokemons(pokemonData);
        };

        fetchData();
    }, []);

    const filteredPokemons = pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-4xl font-bold text-center mb-8">Pokemon Search</h1>
            <input
                type="text"
                placeholder="Search your Pokemon"
                className="block mx-auto w-full max-w-lg p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-8"
                onChange={e => setSearchTerm(e.target.value)}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredPokemons.map(pokemon => (
                    <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
            </div>
        </div>
    );
};

export default App;
