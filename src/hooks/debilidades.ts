import { useEffect, useState } from "react";
import { KnownPokemonType, Pokemon, fetchPokemonTypeDamage } from "../models";

export const usePokemonWeaknesses = (
  pokemon: Pokemon | undefined
): KnownPokemonType[] => {
  const [weaknesses, setWeaknesses] = useState<KnownPokemonType[]>([]);

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
  const weaknesses: Set<KnownPokemonType> = new Set();
  const doubleDamageFrom: { name: string }[] = [];
  const halfDamageFrom: { name: string }[] = [];
  const noDamageFrom: { name: string }[] = [];

  // Obtener las debilidades, resistencias y ningún daño de ambos tipos
  for (const type of pokemon.types) {
    const pokemonTypeDamage = await fetchPokemonTypeDamage(type.type.url);
    doubleDamageFrom.push(
      ...pokemonTypeDamage.damage_relations.double_damage_from
    );
    halfDamageFrom.push(...pokemonTypeDamage.damage_relations.half_damage_from);
    noDamageFrom.push(...pokemonTypeDamage.damage_relations.no_damage_from);
  }

  // Filtrar las debilidades que no son neutralizadas por las resistencias del otro tipo
  for (const weakness of doubleDamageFrom) {
    if (
      !halfDamageFrom.some((resistance) => resistance.name === weakness.name) &&
      !noDamageFrom.some((noDamage) => noDamage.name === weakness.name)
    ) {
      weaknesses.add(weakness.name as KnownPokemonType);
    }
  }

  return Array.from(weaknesses);
};
