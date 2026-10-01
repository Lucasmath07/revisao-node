import { randomUUID } from "node:crypto";
import { sql } from "./db.js";

export default class DatabasePostgres {
  #videos = new Map();

  async list(search) {
    let videos;
    if (search) {
      videos = await sql`select * from videos where title like ${ '%' + search + '%'}`;
    } else {
      videos = await sql`select * from videos`;
    }

    return videos;
  }

  async create(video) {
    const videoID = randomUUID();
    const { title, description, duration } = video;
    await sql`insert into videos (id, title, description, duration) VALUES (${videoID},${title}, ${description}, ${duration})`;
  }

  async update(id, video) {
    const { title, description, duration } = video;

    await sql`
      UPDATE videos 
      SET title = ${title}, description = ${description}, duration = ${duration}
      WHERE id = ${id}
    `;
  }

  async delete(id) {
    await sql`
      DELETE FROM videos WHERE id = ${id}
    `;
  }
}
