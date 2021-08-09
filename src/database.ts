import { getConnectionManager } from "typeorm";

if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL.indexOf("sslmode=require") === -1) {
  process.env.DATABASE_URL += "?sslmode=require";
  
}

if (process.env.NODE_ENV === 'test') {
  console.log(`Utilizando o banco de dados de testes`);
} 

export default async function connect () {
  const connectionManager = await getConnectionManager();
  if(process.env.NODE_ENV != 'test'){
    const connection = connectionManager.create({
      name: "default",
      type: "postgres",
      url: process.env.DATABASE_URL,
      entities: [`${process.env.NODE_ENV === 'production' ? 'dist' : 'src'}/entities/*.*`],
      ssl: process.env.NODE_ENV === 'production'
    });
    await connection.connect();
    return connection;
  }
  else{
    const connection = connectionManager.create({
      name: "default",
      type: "postgres",
      url: process.env.DATABASE_URL,
      entities: [`src/entities/*.*`],
      ssl: false
    });
    await connection.connect();
    return connection;
  }
  

}

