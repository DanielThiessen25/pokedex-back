import { Request, Response } from "express";

import * as userService from "../services/userService";
import * as sessionService from "../services/sessionService";
import * as pokemonService from "../services/pokemonService";

export async function getAllPokemons (req: Request, res: Response) {
    try {
    const pokemons = await pokemonService.getPokemons();
    return res.send(pokemons);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
  }

  export async function populatePokemons (req:Request, res: Response){
    try{
        const addPokemons = await pokemonService.populate(req.body);
        res.send(addPokemons).sendStatus(201);
    } catch(err){
        console.error(err);
        res.sendStatus(500)
    }
  }

  export async function addPokemon (req:Request, res: Response){
    try{
        await pokemonService.addPokemon(parseInt(req.params.id));
        return res.sendStatus(200);
        
    } catch(err){
        console.error(err);
        res.sendStatus(500)
    }
  }

  export async function removePokemon (req:Request, res: Response){
    try{
        await pokemonService.removePokemon(parseInt(req.params.id));
        return res.sendStatus(200);
        
    } catch(err){
        console.error(err);
        res.sendStatus(500)
    }
  }