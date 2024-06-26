import c from "classnames";
import { useState } from "react";
import { useTheme } from "../contexts/use-theme";
import {
  usePokemon,
  usePokemonList,
  usePokemonWeaknesses,
  useFavorite,
} from "../hooks";
import { useTextTransition } from "../hooks/use-text-transition";
import { Button } from "./button";
import { LedDisplay } from "./led-display";
import { randomMode } from "../utils/random";
import { typeImageMap } from "../assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import type { KnownPokemonType } from "models";

import "./pokedex.css";

export function Pokedex() {
  const { theme } = useTheme();
  const { ready, resetTransition } = useTextTransition();
  const { pokemonList } = usePokemonList();
  const [i, setI] = useState(0);
  const { pokemon: selectedPokemon } = usePokemon(pokemonList[i]);
  const { pokemon: nextPokemon } = usePokemon(pokemonList[i + 1]);

  const { favoritePokemon, toggleFavorite, errorMessage } = useFavorite(
    selectedPokemon || null
  );

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
  const isCurrentPokemonFavorite = selectedPokemon
    ? favoritePokemon.some((p) => p.name === selectedPokemon.name)
    : false;

  return selectedPokemon ? (
    <div className={c("pokedex", `pokedex-${theme}`)}>
      <div className="panel left-panel">
        <h2 className="favorite-title">Pokemon Team</h2>
        <div className="favorite-pokemon-container">
          {Array(6)
            .fill(null)
            .map((_, index) => (
              <div key={index} className="favorite-pokemon-wrapper">
                {favoritePokemon[index] && (
                  <img
                    src={favoritePokemon[index].imageSrc}
                    alt={favoritePokemon[index].name}
                    className="favorite-pokemon-image"
                  />
                )}
              </div>
            ))}
        </div>
      </div>

      <div className="panel center-panel">
        <div className="pokemon-info">
          <button
            className="heart-button"
            onClick={() => toggleFavorite(selectedPokemon)}
          >
            <FontAwesomeIcon
              icon={faHeart}
              color={isCurrentPokemonFavorite ? "red" : "black"}
              size="2x"
            />
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
          <div
            className={c(
              "obfuscated",
              ready && "ready",
              ready && `ready--${randomMode()}`
            )}
          >
            <div className="types">
              <strong>Types:</strong>
            </div>
            {selectedPokemon?.types.map((pokemonType) => (
              <React.Fragment key={pokemonType.type.name}>
                <img
                  className="imagenes"
                  src={typeImageMap[pokemonType.type.name as KnownPokemonType]}
                  alt={pokemonType.type.name}
                />
              </React.Fragment>
            ))}
          </div>
          <div
            className={c(
              "obfuscated",
              ready && "ready",
              ready && `ready--${randomMode()}`
            )}
          >
            <div className="weaknesses">
              <strong>Weaknesses:</strong>
            </div>
            {weaknesses.map((weakness) => (
              <React.Fragment key={weakness}>
                <img
                  className="imagenes"
                  src={typeImageMap[weakness]}
                  alt={weakness}
                />
              </React.Fragment>
            ))}
          </div>
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
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
