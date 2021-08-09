import { Request, Response } from "express";

import { getRepository } from "typeorm";

import Pokemon from "../entities/Pokemon";

interface PokemonCreate {
  name: string,
  number:number,
  image:string,
  weight:number,
  height:number,
  baseExp:number,
  description:string,
  inMyPokemons:boolean
}

export async function getPokemons () {
  const pokemons = await getRepository(Pokemon).find();
  return pokemons;

}

export async function populate (finalPokemon: PokemonCreate) {

    const addPokemon = await getRepository(Pokemon).create(finalPokemon);
    await getRepository(Pokemon).save(addPokemon);
    return addPokemon;
  
  }

  export async function addPokemon (pokemonId: number) {

    await getRepository(Pokemon).update({id:pokemonId},{inMyPokemons:true});

  
  }