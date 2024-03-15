export type PokedexTheme = "blue" | "red" | "yellow" | "green";
export type PokemonUri = {
  name: string;
  url: string;
};

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

export const getPokemonTypeDamage = async (url: string): Promise<PokemonTypeDamage> => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export interface PokemonTypeDamage {
  damage_relations: {
    double_damage_from: { name: string, url: string }[];
    double_damage_to: { name: string, url: string }[];
    half_damage_from: { name: string, url: string }[];
    half_damage_to: { name: string, url: string }[];
  };
}

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
