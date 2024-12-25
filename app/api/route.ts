import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    const user = await prisma.user.findMany();
    return new NextResponse(JSON.stringify(user), {
        status: 405,
        headers: {
            'Allow': 'POST',
        },
    });
}