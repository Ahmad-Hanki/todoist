import { nileClient } from "@/config/NilePostgresConfig";

export async function POST(request: Request) {
  const { name, email, image } = await request.json();
  console.log(name, email, image, "\n\n\n\n\n\n\n\n");
  await nileClient.connect();

  const result = await nileClient.query(`
    INSERT INTO USERS VALUES(DEFAULT,'${name}','${email}','${image}')
    `);

  await nileClient.end();

  console.log(result);

  return Response.json({ result });
}

export async function GET(request: Request) {
  const email = new URL(request.url).searchParams.get("email");

  try {
    await nileClient.connect();

    const result = await nileClient.query(`
      SELECT * FROM USERS WHERE email='${email}'
    `);

    await nileClient.end();

    return Response.json( result.rows[0] );
  } catch (err) {
    console.log(err);
    return Response.json({ error: err });
  }
}
