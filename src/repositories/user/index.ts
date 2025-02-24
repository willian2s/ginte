import prisma from "@/prisma";

interface FindMay {
  name?: string;
  email?: string;
}

export interface FindOne {
  id: string;
}

export interface DeleteMany {
  id: string[];
}

export interface CreateUser {
  name: string;
  email: string;
  address: string;
  phone: string;
  birthDate: Date;
}

interface Pagination {
  page: number;
  limit: number;
}

export const FindMany = async (where: FindMay, pagination: Pagination) => {
  const page = pagination.page || 1;
  const limit = pagination.limit || 10;

  const skip = page > 0 ? limit * (page - 1) : 0;
  const total = await prisma.user.count({
    where,
  });

  const users = await prisma.user.findMany({
    where,
    take: limit,
    skip,
  });

  const lastPage = Math.ceil(total / limit);

  return {
    data: users,
    meta: {
      total,
      lastPage,
      currentPage: page,
      limit,
      prev: page > 1 ? page - 1 : null,
      next: page < lastPage ? page + 1 : null,
    },
  };
};

export const FindOne = async (where: FindOne) => {
  const user = await prisma.user.findFirst({
    where,
  });

  return user;
};

export const Update = async (where: FindOne, data: Partial<CreateUser>) => {
  const user = await prisma.user.update({
    where,
    data,
  });

  return user;
};

export const Delete = async (where: DeleteMany) => {
  await prisma.user.deleteMany({
    where: {
      id: {
        in: where.id,
      },
    },
  });
};

export const Create = async (data: CreateUser) => {
  const user = await prisma.user.create({
    data,
  });

  return user;
};
