import type { Pokemon } from "models";
import { calculateWeaknesses, PokemonType } from "../hooks/pokemon-utils";
import "./pokemon-card.css";

type Props = {
  pokemon: Pokemon;
  onClick: () => void;
};

export function PokemonCard({ pokemon, onClick }: Props) {
  const { types } = pokemon;
  const weaknesses = calculateWeaknesses(types as PokemonType[]);

  return (
    <article className="pokemon-card" role="listitem" onClick={onClick}>
      <>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <p>{pokemon.name}</p>
        <div className="types">
          <strong>Types:</strong> {types.join(", ")}
        </div>
        <div className="weaknesses">
          <strong>Weaknesses:</strong> {weaknesses.join(", ")}
        </div>
      </>
    </article>
  );
}