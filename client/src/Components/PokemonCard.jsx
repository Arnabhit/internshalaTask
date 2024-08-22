import React from 'react';

const PokemonCard = ({ pokemon }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
            <img className="w-20 h-20" src={pokemon.sprites.front_default} alt={pokemon.name} />
            <h3 className="mt-2 text-lg font-semibold capitalize">{pokemon.name}</h3>
        </div>
    );
};

export default PokemonCard;
