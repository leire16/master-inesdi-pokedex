import { useEffect, useState } from "react";
import { Pokemon, fetchPokemonTypeDamage } from "../models";

//IMAGENES
import bug from '../assets/2/bug.png';
import electric from '../assets/2/electric.png';
import fairy from '../assets/2/fairy.png';
import fighting from '../assets/2/fighting.png';
import fire from '../assets/2/fire.png';
import flying from '../assets/2/flying.png';
import grass from '../assets/2/grass.png';
import ground from '../assets/2/ground.png';
import ice from '../assets/2/ice.png';
import normal from '../assets/2/normal.png';
import poison from '../assets/2/poison.png';
import psychic from '../assets/2/psychic.png';
import rock from '../assets/2/rock.png';
import steel from '../assets/2/steel.png';
import water from '../assets/2/water.png';

// Define el tipo para el mapeo de imágenes
interface TypeImageMap {
  [key: string]: string;
}
// Objeto que mapea los nombres de los tipos a las rutas de las imágenes
export const typeImageMap: TypeImageMap = {
  grass: grass,
  flying: flying,
  poison: poison,
  psychic: psychic,
  fire: fire,
  ice: ice,
  ground: ground,
  rock: rock,
  water: water,
  electric: electric,
  bug: bug,
  normal: normal,
  fighting: fighting,
  steel: steel,
  fairy: fairy,
};

export const usePokemonWeaknesses = (pokemon: Pokemon | undefined) => {
  const [weaknesses, setWeaknesses] = useState<string[]>([]);

  useEffect(() => {
    const fetchWeaknesses = async () => {
      if (!pokemon) return; // Si pokemon es undefined, no hago nada
      const weaknessesResult = await resolvePokemonWeaknesses({ pokemon });
      setWeaknesses(weaknessesResult);
    };

    fetchWeaknesses();
  }, [pokemon]);

  return weaknesses;
};

const resolvePokemonWeaknesses = async ({ pokemon }: { pokemon: Pokemon }) => {
  const weaknesses: Set<string> = new Set();
  const doubleDamageFrom: { name: string }[] = [];
  const halfDamageFrom: { name: string }[] = [];
  const noDamageFrom: { name: string }[] = [];

  // Obtener las debilidades, resistencias y ningún daño de ambos tipos
  for (const type of pokemon.types) {
      const pokemonTypeDamage = await fetchPokemonTypeDamage(type.type.url);
      doubleDamageFrom.push(...pokemonTypeDamage.damage_relations.double_damage_from);
      halfDamageFrom.push(...pokemonTypeDamage.damage_relations.half_damage_from);
      noDamageFrom.push(...pokemonTypeDamage.damage_relations.no_damage_from);
  }

  // Filtrar las debilidades que no son neutralizadas por las resistencias del otro tipo
  for (const weakness of doubleDamageFrom) {
      if (!halfDamageFrom.some(resistance => resistance.name === weakness.name) &&
          !noDamageFrom.some(noDamage => noDamage.name === weakness.name)) {
          weaknesses.add(weakness.name);
      }
  }

  return Array.from(weaknesses);
};
