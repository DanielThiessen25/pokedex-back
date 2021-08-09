import { Request, Response } from "express";

import { getRepository } from "typeorm";
import axios from "axios";

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

  const connection = await axios.get(`https://pokeapi.co/api/v2/pokemon`);
  const list = connection.data.results;
  
  return list.length;

  
  }