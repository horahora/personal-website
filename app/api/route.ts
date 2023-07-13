import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://api.github.com", {
    // headers: {
    //   "Content-Type": "application/json",
    //   "API-Key": process.env.DATA_API_KEY,
    // },
  });
  console.log(res);
  const data = await res.json();

  return NextResponse.json({ data });
}
