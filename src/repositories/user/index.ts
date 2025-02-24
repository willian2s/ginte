import prisma from "@/prisma";

interface FindMay {
  name?: string;
  email?: string;
}

export interface FindOne {
  id: string;
}

export interface CreateUser {
  name: string;
  email: string;
  address: string;
  phone: string;
  birthDate: Date;
}

export const FindMany = async (where: FindMay) => {
  const user = await prisma.user.findMany({
    where,
  });

  return user;
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

export const Delete = async (where: FindOne) => {
  await prisma.user.delete({
    where,
  });
};

export const Create = async (data: CreateUser) => {
  const user = await prisma.user.create({
    data,
  });

  return user;
};
