import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "../../../libs/prismadb";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  if (currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  const body = await request.json();
  const { id, delivaryStatus } = body;

  const order = await prisma.order.update({
    where: { id },
    data: { delivaryStatus },
  });
  return NextResponse.json(order);
}
