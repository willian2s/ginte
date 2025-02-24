import { database } from "@/prisma";

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
  const user = await database.user.findMany({
    where,
  });

  return user;
};

export const FindOne = async (where: FindOne) => {
  const user = await database.user.findFirst({
    where,
  });

  return user;
};

export const Update = async (where: FindOne, data: Partial<CreateUser>) => {
  const user = await database.user.update({
    where,
    data,
  });

  return user;
};

export const Delete = async (where: FindOne) => {
  await database.user.delete({
    where,
  });
};

export const Create = async (data: CreateUser) => {
  const user = await database.user.create({
    data,
  });

  return user;
};
