import { nileClient } from "@/config/NilePostgresConfig";

export const POST = async (request: Request) => {
  const { content, imageUrl, visibleIn, email } = await request.json();

  try {
    await nileClient.connect();

    const result = await nileClient.query(`
      INSERT INTO POST VALUES(DEFAULT,'${content}','${imageUrl}',DEFAULT,'${email}','${visibleIn}')
    `);

    await nileClient.end();

    return Response.json(result);
  } catch (error) {
    console.log(error);
  }
};
