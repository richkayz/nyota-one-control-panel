import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ id: string }>;
};

function getBusinessId(id: string) {
  const businessId = Number(id);

  if (!Number.isInteger(businessId) || businessId <= 0) {
    return null;
  }

  return businessId;
}

export async function GET(
  _request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;
    const businessId = getBusinessId(id);

    if (!businessId) {
      return NextResponse.json(
        { error: "Invalid business ID" },
        { status: 400 }
      );
    }

    const business = await prisma.business.findUnique({
      where: { id: businessId },
      include: {
        locations: true,
        contacts: true,
        services: true,
        logoRequests: true,
        documents: true,
        activities: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!business) {
      return NextResponse.json(
        { error: "Business not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(business);
  } catch {
    return NextResponse.json(
      { error: "Unable to load business" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;
    const businessId = getBusinessId(id);

    if (!businessId) {
      return NextResponse.json(
        { error: "Invalid business ID" },
        { status: 400 }
      );
    }

    const body = await request.json();

    const business = await prisma.business.update({
      where: { id: businessId },
      data: {
        name: body.name,
        legalName: body.legalName || null,
        category: body.category || null,
        description: body.description || null,
        tagline: body.tagline || null,
        country: body.country || "Uganda",
        city: body.city || null,
        region: body.region || null,
        timezone: body.timezone || "Africa/Kampala",
        currency: body.currency || "UGX",
        language: body.language || "en",
        registrationNumber: body.registrationNumber || null,
        taxNumber: body.taxNumber || null,
        email: body.email || null,
        phone: body.phone || null,
        whatsapp: body.whatsapp || null,
        website: body.website || null,
        address: body.address || null,
        logo: body.logo || null,
        coverImage: body.coverImage || null,
        brandColors: body.brandColors || null,
        brandGuidelines: body.brandGuidelines || null,
      },
    });

    return NextResponse.json(business);
  } catch {
    return NextResponse.json(
      { error: "Unable to update business" },
      { status: 500 }
    );
  }
}