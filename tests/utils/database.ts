import { getRepository } from "typeorm";

import User from "../../src/entities/User";
import Pokemon from "../../src/entities/Pokemon";

export async function clearDatabase () {
  await getRepository(User).delete({});
  await getRepository(Pokemon).delete({});
}
