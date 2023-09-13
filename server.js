import { fastify } from "fastify";
// import { DatabaseMemory } from "./database-memory.js";
import { DatabasePostgres } from "./database-postgres.js";
const server = fastify();
// const database = new DatabaseMemory();
const database = new DatabasePostgres();

//Request Body
//Router Parameter

//GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS
//POST http://localhost:3333/videos
//PUT http://localhost:3333/videos/1 or 2..etc..

server.post("/videos", async (request, reply) => {
  const { title, description, duration } = request.body;

  await database.create({
    title,
    description,
    duration,
  });

  return reply.status(201).send();
});

server.get("/videos", async (request) => {
  const search = request.query.search;
  const videos = await database.list(search);

  return videos;
});

server.put("/videos/:id", async (request, reply) => {
  const { title, description, duration } = request.body;
  const videoId = request.params.id;
  await database.update(videoId, {
    title,
    description,
    duration,
  });
  return reply.status(204).send();
});

server.delete("/videos/:id", async (request, reply) => {
  const videoId = request.params.id;
  await database.delete(videoId);
  return reply.status(204).send();
});

server.listen({
  host: "0.0.0.0",
  port: process.env.PORT ?? 3333,
});
