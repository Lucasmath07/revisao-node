// import { response } from "express";
// import { createServer, request } from "node:http";

// const porta = 3333;

// const server = createServer((request,response)=>{
//   response.write('Hello world')
//   return response.end()
// })

// server.listen(3333);
import { fastify } from "fastify";
import { DatabaseMemory } from "./database-memory.js";
import { title } from "node:process";
import { describe } from "node:test";
import  DatabasePostgres  from "./database-postgres.js";
const server = fastify();

// GET - busca informação
// POST - Criar
// PUT -alteração
// Delete - apagar
//patch - alterar uma parte

//Route parameter

//const database = new DatabaseMemory();

const database = new DatabasePostgres();

//Request body - sempre no post e put enviar os dados de um form

server.post("/videos", async (request, reply) => {
  const { title, description, duration } = request.body;

  await database.create({
    title,
    description,
    duration,
  });

  return reply.status(201).send();
});

server.get("/videos", async (request, reply) => {
  const { search } = request.query;

  console.log(search);

  const videos = await database.list(search);

  return videos;
});

server.put("/videos/:id", (request, reply) => {
  const videoId = request.params.id;
  const { title, description, duration } = request.body;

  const video = database.update(videoId, {
    title,
    description,
    duration,
  });
  return reply.status(204).send();
});

server.delete("/videos/:id", (request, reply) => {
  const videoId = request.params.id;

  database.delete(videoId);

  return reply.status(204).send();
});

server.listen({
  port: process.env.PORT ?? 3333,
});
