import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSlug } from "@/lib/utils";

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: { category: true },
      orderBy: { date: "desc" },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    // Hata durumunda boş array dön - client tarafında .map hatası önlenir
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      excerpt,
      content,
      author,
      tags,
      color,
      imageUrl,
      categoryId,
    } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const slug = body.slug || createSlug(title);

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        author,
        tags,
        color,
        imageUrl,
        categoryId: categoryId || null,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Failed to create post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
