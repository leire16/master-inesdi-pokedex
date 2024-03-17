import c from "classnames";
import { useState } from "react";
import { useTheme } from "../contexts/use-theme";
import { usePokemon, usePokemonList,usePokemonWeaknesses } from "../hooks";
import { useTextTransition } from "../hooks/use-text-transition";
import { Button } from "./button";
import { LedDisplay } from "./led-display";
import { randomMode } from "../utils/random";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Pokemon } from "../models";

import "./pokedex.css";

export function Pokedex() {
  const { theme } = useTheme();
  const { ready, resetTransition } = useTextTransition();
  const { pokemonList } = usePokemonList();
  const [i, setI] = useState(0);
  const { pokemon: selectedPokemon } = usePokemon(pokemonList[i]);
  const { pokemon: nextPokemon } = usePokemon(pokemonList[i + 1]);
  /*const [isFavorite, setIsFavorite] = useState(false);*/

  const weaknesses = usePokemonWeaknesses(selectedPokemon);

  /*const toggleFavorite = () => {
    console.log("Pokemon seleccionado: "+selectedPokemon?.name)
    if (selectedPokemon) { // Verificar que selectedPokemon no sea undefined
      setIsFavorite(!isFavorite);
      if (!isFavorite) {
        addToTeam(selectedPokemon);
      } else {
        removeFromTeam(selectedPokemon);
      }
    }
  };*/

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

  /*const addToTeam = (pokemon: Pokemon) => {
    // Aquí puedes implementar la lógica para agregar el Pokémon al equipo
    console.log("Añadir a equipo:", pokemon.name);
  };

  const removeFromTeam = (pokemon: Pokemon) => {
    // Aquí puedes implementar la lógica para quitar el Pokémon del equipo
    console.log("Eliminar de equipo:", pokemon.name);
  };*/

  return selectedPokemon ? (
    <div className={c("pokedex", `pokedex-${theme}`)}>
      <div className="panel left-panel">
        {/* Botón de corazón 
        <button className="heart-button" onClick={toggleFavorite}>
          <FontAwesomeIcon icon={faHeart} color={isFavorite ? 'red' : 'black'} size="3x" />
        </button>*/}

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
          <div className={c("types", "obfuscated",
              ready && "ready",
              ready && `ready--${randomMode()}`)}>
            <strong>Types:</strong>{" "}
            {selectedPokemon?.types.map((type) => type.type.name).join(", ")}
          </div>
          <div className={c("weaknesses", "obfuscated",
              ready && "ready",
              ready && `ready--${randomMode()}`)}>
            <strong>Weaknesses:</strong> {weaknesses.join(', ')}
          </div>
        </div>
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
