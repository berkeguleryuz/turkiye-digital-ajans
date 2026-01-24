import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSlug } from "@/lib/utils";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.post.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Failed to delete post:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    const slug = body.slug || createSlug(title);

    const post = await prisma.post.update({
      where: { id },
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
    console.error("Failed to update post:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}
