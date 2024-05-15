import prisma from "@/libs/prismadb";

export interface IParams {
  productId?: string;
}

export default async function getProductById({ productId }: IParams) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    if (!product) return null;
    return product;
  } catch (error: any) {
    throw new Error(error);
  }
}
