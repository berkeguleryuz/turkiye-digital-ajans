import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSlug } from "@/lib/utils";

export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    // Hata durumunda boş array dön
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, slug } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const finalSlug = slug || createSlug(name);

    const category = await prisma.category.create({
      data: { name, slug: finalSlug },
    });

    return NextResponse.json(category);
  } catch (error: unknown) {
    const prismaError = error as { code?: string };
    if (prismaError.code === "P2002") {
      return NextResponse.json(
        { error: "Bu isimde bir kategori zaten mevcut" },
        { status: 409 }
      );
    }
    console.error("Failed to create category:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}
