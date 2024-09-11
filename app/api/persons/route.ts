import { NextResponse } from "next/server";
import { persons } from "@/app/data/person";

export async function GET() {
  return NextResponse.json({
    status: 200,
    message: "Success get persons",
    data: persons,
    // data: [],
  });
}
