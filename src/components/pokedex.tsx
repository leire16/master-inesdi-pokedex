import c from "classnames";
import { useState } from "react";
import { useTheme } from "../contexts/use-theme";
import { usePokemon, usePokemonList,usePokemonWeaknesses,typeImageMap,useFavorite } from "../hooks";
import { useTextTransition } from "../hooks/use-text-transition";
import { Button } from "./button";
import { LedDisplay } from "./led-display";
import { randomMode } from "../utils/random";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import React from 'react';

import "./pokedex.css";

export function Pokedex() {
  const { theme } = useTheme();
  const { ready, resetTransition } = useTextTransition();
  const { pokemonList } = usePokemonList();
  const [i, setI] = useState(0);
  const { pokemon: selectedPokemon } = usePokemon(pokemonList[i]);
  const { pokemon: nextPokemon } = usePokemon(pokemonList[i + 1]);
  
  const { favoritePokemon, toggleFavorite, errorMessage } = useFavorite(selectedPokemon || null); // Importa errorMessage

  const weaknesses = usePokemonWeaknesses(selectedPokemon);

  const prev = () => {
    resetTransition();
    if (i === 0) {
      setI(pokemonList.length - 1);
    }
    setI((i) => i - 1);
  };

  const next = () => {
    resetTransition();
    if (i === pokemonList.length - 1) {
      setI(0);
    }
    setI((i) => i + 1);
  };

  // Verificar si el Pokémon actual es favorito
  const isCurrentPokemonFavorite = selectedPokemon ? favoritePokemon.some(p => p.name === selectedPokemon.name) : false;

  return selectedPokemon ? (
    <div className={c("pokedex", `pokedex-${theme}`)}>
      <div className="panel left-panel">
      <div className="pokemon-info">
          {/* Botón de corazón */}
          <button className="heart-button" onClick={() => toggleFavorite(selectedPokemon)}>
            <FontAwesomeIcon icon={faHeart} color={isCurrentPokemonFavorite ? 'red' : 'black'} size="3x" />
          </button>
        </div>

        <div className="screen main-screen">
          {selectedPokemon && (
            <img
              className={c(
                "sprite",
                "obfuscated",
                ready && "ready",
                ready && `ready--${randomMode()}`
              )}
              src={selectedPokemon.sprites.front_default}
              alt={selectedPokemon.name}
            />
          )}
        </div>
        <div className="screen name-display">
          <div
            className={c(
              "name",
              "obfuscated",
              ready && "ready",
              ready && `ready--${randomMode()}`
            )}
          >
            {selectedPokemon?.name}
          </div>
        </div>
        <div className="screen type-display">
          <div className={c( "obfuscated",
              ready && "ready",
              ready && `ready--${randomMode()}`)}>
            <div className="types"><strong>Types:</strong></div>
            {selectedPokemon?.types.map((type) => (
              <React.Fragment key={type.type.name}>       
                <img className="imagenes"
                  src={typeImageMap[type.type.name]}
                  alt={type.type.name}
                />
                </React.Fragment>
            ))}
          </div>
          <div className={c("obfuscated",
              ready && "ready",
              ready && `ready--${randomMode()}`)}>
            <div className="weaknesses"><strong>Weaknesses:</strong></div>
            {weaknesses.map((weakness) => (
              <React.Fragment key={weakness}>
                <img className="imagenes"
                  src={typeImageMap[weakness]}
                  alt={weakness}
                />
              </React.Fragment>
            ))}
          </div>
        </div>
        {/* Renderizar el mensaje de error aquí */}
        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}
      </div>
      <div className="panel right-panel">
        <div className="controls leds">
          <LedDisplay color="blue" />
          <LedDisplay color="red" />
          <LedDisplay color="yellow" />
        </div>
        <div className="screen second-screen">
          {nextPokemon && (
            <img
              className={c(
                "sprite",
                "obfuscated",
                ready && "ready",
                ready && `ready--${randomMode()}`
              )}
              src={nextPokemon.sprites.front_default}
              alt={nextPokemon.name}
            />
          )}
        </div>
        <div className="controls">
          <Button label="prev" onClick={prev} />
          <Button label="next" onClick={next} />
        </div>
      </div>
    </div>
  ) : null;
}
