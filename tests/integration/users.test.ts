import supertest from "supertest";
import { getConnection } from "typeorm";

import app, { init } from "../../src/app";
import { getPokemons, insertTestPokemon } from "../factories/pokemonFactory";
import { createUser, authenticateUser } from "../factories/userFactory";
import { clearDatabase } from "../utils/database";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await getConnection().close();
});

describe("POST /sign-up", () => {
  it("should answer with status 201 when creating a valid user", async () => {
    const body = {
      email:"teste2@teste.com",
      password:"senha",
      confirmPassword:"senha"
    };

    const response = await supertest(app).post("/sign-up").send(body);
    expect(response.status).toBe(201);
  });

  it("should answer with status 400 when is not a valid email", async () => {
    const body = {
      email:"",
      password:"senha",
      confirmPassword:"senha"
    };

    const response = await supertest(app).post("/sign-up").send(body);
    expect(response.status).toBe(400);
  });

  it("should answer with status 400 when password is different than confirmPassword", async () => {
    const body = {
      email:"teste@teste.com",
      password:"senha",
      confirmPassword:"senha2"
    };

    const response = await supertest(app).post("/sign-up").send(body);
    expect(response.status).toBe(400);
  });

  it("should answer with status 409 if email is already used", async () => {
    const user =  await createUser();
    
    const body = {
      email:user.email,
      password:"senha",
      confirmPassword:"senha"
    };

    const response = await supertest(app).post("/sign-up").send(body);
    expect(response.status).toBe(409);
  });
});


describe("POST /login", () => {
  it("should answer with status 201 when loggin with a valid user", async () => {
    const user =  await createUser();
    
    const response = await supertest(app).post("/login").send({email:user.email, password:"123456"});
    expect(response.status).toBe(200);
  });

  it("should answer with status 400 when is not a valid email", async () => {
    const body = {
      email:"",
      password:"senha"
    };

    const response = await supertest(app).post("/login").send(body);
    expect(response.status).toBe(400);
  });

  it("should answer with status 400 when email or password is wrong", async () => {
    const user =  await createUser();
    
    const response = await supertest(app).post("/login").send({email:user.email, password:"123"});
    expect(response.status).toBe(401);
  });
});

describe("GET /pokemons", () => {
  it("should answer with status 200 when sucessfully authenticate", async () => {
    const user =  await createUser();
    const auth = await authenticateUser(user);
    const response = await supertest(app).get("/pokemons").set("authorization", `Bearer ${auth.token}`);
    expect(response.status).toBe(200);
  });


  it("should answer with status 401 when failed authentication", async () => {
    const user =  await createUser();
    const auth = await authenticateUser(user);
    const response = await supertest(app).get("/pokemons").set("authorization", `Bearer token_errado`);
    expect(response.status).toBe(401);
  });

});

describe("POST /my-pokemons/:id/add", () => {
  it("should answer with status 200 when sucessfully add pokemon", async () => {
    const user =  await createUser();
    const auth = await authenticateUser(user);
    const newPokemon = await insertTestPokemon();

    await supertest(app).post("/my-pokemons/"+newPokemon.id+"/add").set("authorization", `Bearer ${auth.token}`);
    const pokemons =await getPokemons();
    expect(pokemons[0].inMyPokemons).toBe(true);
  });


  it("should answer with status 401 when failed authentication", async () => {
    const user =  await createUser();
    const auth = await authenticateUser(user);
    const newPokemon = await insertTestPokemon();

    const response = await supertest(app).post("/my-pokemons/"+newPokemon.id+"/add").set("authorization", `Bearer token_incorreto`);
    expect(response.status).toBe(401);
  });

});


describe("POST /my-pokemons/:id/remove", () => {
  it("should answer with status 200 when sucessfully remove pokemon", async () => {
    const user =  await createUser();
    const auth = await authenticateUser(user);
    const newPokemon = await insertTestPokemon();

    await supertest(app).post("/my-pokemons/"+newPokemon.id+"/remove").set("authorization", `Bearer ${auth.token}`);
    const pokemons = await getPokemons();
    console.log(pokemons);
    expect(pokemons[0].inMyPokemons).toBe(false);
  });


  it("should answer with status 401 when failed authentication", async () => {
    const user =  await createUser();
    const auth = await authenticateUser(user);
    const newPokemon = await insertTestPokemon();

    const response = await supertest(app).post("/my-pokemons/"+newPokemon.id+"/remove").set("authorization", `Bearer token_incorreto`);
    expect(response.status).toBe(401);
  });

});