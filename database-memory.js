import { randomUUID } from "node:crypto";

export class DatabaseMemory {
  #videos = new Map();

  list(search) {
    return Array.from(this.#videos.entries(), ([id, data]) => ({
      id,
      ...data,
    })).filter((video) => {
      // Se houver um termo de busca válido
      if (search && typeof search === "string") {
        return (video.title ?? "").toLowerCase().includes(search.toLowerCase());
      }

      // Se não houver busca, retorna todos os vídeos
      return true;
    });
  }

  create(video) {
    const videoId = randomUUID(); // Unique Universal ID

    this.#videos.set(videoId, video);
  }

  update(id, video) {
    this.#videos.set(id, video);
  }

  delete(id) {
    this.#videos.delete(id);
  }
}
