import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, email, projectType, budget } = body;

    if (!name || !email || !projectType || !budget) {
      return NextResponse.json(
        { error: "Eksik bilgi gönderildi." },
        { status: 400 }
      );
    }

    const proposal = await prisma.proposal.create({
      data: {
        name,
        company,
        email,
        projectType,
        budget,
      },
    });

    return NextResponse.json(proposal, { status: 201 });
  } catch (error) {
    console.error("Proposal creation error:", error);
    return NextResponse.json(
      { error: "Teklif oluşturulurken bir hata oluştu." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const proposals = await prisma.proposal.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(proposals);
  } catch (error) {
    console.error("Proposal fetch error:", error);
    return NextResponse.json(
      { error: "Teklifler alınırken bir hata oluştu." },
      { status: 500 }
    );
  }
}
