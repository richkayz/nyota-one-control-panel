import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const businesses = await prisma.business.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(businesses);
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.name || typeof body.name !== "string") {
    return NextResponse.json(
      { error: "Business name is required" },
      { status: 400 }
    );
  }

  const ownerId = Number(body.ownerId);

  if (!Number.isInteger(ownerId) || ownerId <= 0) {
    return NextResponse.json(
      { error: "Valid ownerId is required" },
      { status: 400 }
    );
  }

  const business = await prisma.business.create({
    data: {
      name: body.name,
      ownerId,
      email: body.email || null,
      phone: body.phone || null,
      logo: body.logo || null,
    },
  });

  return NextResponse.json(business, { status: 201 });
}