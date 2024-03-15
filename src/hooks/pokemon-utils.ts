import type { PokemonType as PT } from "../models";

const typeWeaknesses: Record<string, string[]> = {
  normal: ["fighting"],
  fire: ["water", "rock", "ground"],
  water: ["electric", "grass"],
  grass: ["fire", "flying", "ice", "bug", "poison"],
  flying: ["electric", "rock", "ice"],
  bug: ["fire", "flying", "rock"],
  electric: ["ground"],
  ground: ["water", "grass", "ice"],
  poison: ["ground", "psychic"],
  fairy: ["poison", "steel"]
};

const typeStrengths: Record<string, string[]> = {
  normal: [],
  fire: ["grass", "bug", "ice", "steel"],
  water: ["fire", "ground", "rock"],
  grass: ["water", "ground", "rock"],
  flying: ["grass", "fighting", "bug","ground"],
  bug: ["grass", "psychic", "dark"],
  electric: ["water", "flying"],
  ground: ["fire", "electric", "poison", "rock", "steel"],
  poison: ["grass", "fairy", "bug", "poison"],
  fairy: ["fighting", "dragon", "dark"]
};

export type PokemonType = PT;

export function calculateWeaknesses(types: PokemonType[]): string[] {
  let weaknesses: string[] = [];

  // Itera sobre los tipos del Pokémon
  for (const type of types) {
    // Suponiendo que el nombre del tipo está en la propiedad 'type.name'
    const typeName = type.type.name;

    // Verifica si hay debilidades conocidas para ese tipo
    if (typeWeaknesses[typeName]) {
      // Agrega las debilidades al conjunto de debilidades del Pokémon
      weaknesses.push(...typeWeaknesses[typeName]);
    }

    // Excluye las fortalezas del conjunto de debilidades del Pokémon
    if (typeStrengths[typeName]) {
      weaknesses = weaknesses.filter(weakness => !typeStrengths[typeName].includes(weakness));
    }

    // Manejo especial para tipos que son fuertes contra el segundo tipo del Pokémon
    if (types.length === 2) {
      const secondType = types.find(t => t !== type);
      if (secondType && typeStrengths[secondType.type.name]) {
        weaknesses = weaknesses.filter(weakness => !typeStrengths[secondType.type.name].includes(weakness));
      }
    }
  }

  // Elimina duplicados y devuelve el conjunto de debilidades únicas
  return Array.from(new Set(weaknesses));
}
