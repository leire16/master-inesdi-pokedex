export type PokedexTheme = "blue" | "red" | "yellow" | "green";
export type PokemonUri = {
  name: string;
  url: string;
};

export type KnownPokemonType =
  | "bug"
  | "electric"
  | "fairy"
  | "fighting"
  | "fire"
  | "flying"
  | "grass"
  | "ground"
  | "ice"
  | "normal"
  | "poison"
  | "psychic"
  | "rock"
  | "steel"
  | "water";

export type PokemonAbility = {
  ability: {
    name: string;
    url: string;
  };
};

export type PokemonStat = {
  base_stat: number;
  stat: {
    name: string;
    url: string;
  };
};

export type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

const pokemonTypeDamageCache = new Map<string, PokemonTypeDamage>();

export const fetchPokemonTypeDamage = async (
  url: string
): Promise<PokemonTypeDamage> => {
  if (pokemonTypeDamageCache.has(url)) {
    return pokemonTypeDamageCache.get(url)!;
  }
  const response = await fetch(url);
  const pokemonTypeDamage = await response.json();
  pokemonTypeDamageCache.set(url, pokemonTypeDamage);
  return pokemonTypeDamage;
};

export type PokemonTypeDamage = {
  damage_relations: {
    double_damage_from: { name: string; url: string }[];
    double_damage_to: { name: string; url: string }[];
    half_damage_from: { name: string; url: string }[];
    half_damage_to: { name: string; url: string }[];
    no_damage_from: { name: string; url: string }[];
  };
};

export type Pokemon = {
  id: number;
  name: string;
  stats: PokemonStat[];
  types: PokemonType[];
  weight: number;
  height: number;
  abilities: PokemonAbility[];
  sprites: {
    front_default: string;
  };
};
