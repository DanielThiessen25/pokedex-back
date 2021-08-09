import { getRepository } from "typeorm";
import Pokemon from "../../src/entities/Pokemon";

export async function insertTestPokemon() {
    const pokemon = await getRepository(Pokemon).create({
        name: "pikachu",
        number: 25,
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    weight:60,
    height: 4,
    baseExp:112,
    description:"eletric",
    inMyPokemons:false
    });
    await getRepository(Pokemon).save(pokemon);

    return pokemon;
}

export async function getPokemons(){
    const list = await getRepository(Pokemon).find();
    return list;
}