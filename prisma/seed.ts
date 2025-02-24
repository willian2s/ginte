import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const users: Prisma.UserCreateInput[] = [
  {
    email: "john.doe@example.com",
    name: "John Doe",
    phone: "11912345678",
    birthDate: new Date("1990-01-01"),
    address: "Rua das Flores, 123, Jardim das Rosas, São Paulo, SP",
  },
  {
    email: "jane.doe@example.com",
    name: "Jane Doe",
    phone: "21987654321",
    birthDate: new Date("1992-05-15"),
    address: "Avenida Paulista, 456, Bela Vista, São Paulo, SP",
  },
  {
    email: "maria.silva@example.com",
    name: "Maria Silva",
    phone: "31912345678",
    birthDate: new Date("1985-07-20"),
    address: "Rua João de Barro, 789, Centro, Belo Horizonte, MG",
  },
  {
    email: "pedro.almeida@example.com",
    name: "Pedro Almeida",
    phone: "41987654321",
    birthDate: new Date("1995-11-30"),
    address: "Avenida Sete, 1000, Vitória, ES",
  },
  {
    email: "lucas.martins@example.com",
    name: "Lucas Martins",
    phone: "61912345678",
    birthDate: new Date("1993-02-10"),
    address: "Rua das Palmeiras, 321, Asa Sul, Brasília, DF",
  },
  {
    email: "paula.santos@example.com",
    name: "Paula Santos",
    phone: "11987654321",
    birthDate: new Date("1994-04-14"),
    address: "Rua dos Três Irmãos, 500, Mooca, São Paulo, SP",
  },
  {
    email: "carla.rodrigues@example.com",
    name: "Carla Rodrigues",
    phone: "31987654321",
    birthDate: new Date("1988-03-25"),
    address: "Rua Flores do Campo, 245, Nova Lima, MG",
  },
  {
    email: "gabriel.oliveira@example.com",
    name: "Gabriel Oliveira",
    phone: "27912345678",
    birthDate: new Date("1991-06-12"),
    address: "Avenida Central, 800, Jardim Carioca, Rio de Janeiro, RJ",
  },
  {
    email: "larissa.pereira@example.com",
    name: "Larissa Pereira",
    phone: "61987654321",
    birthDate: new Date("1996-10-05"),
    address: "Rua 15 de Novembro, 123, Taguatinga, Brasília, DF",
  },
  {
    email: "felipe.costa@example.com",
    name: "Felipe Costa",
    phone: "21912345678",
    birthDate: new Date("1987-12-03"),
    address: "Avenida Rio Branco, 321, Centro, Rio de Janeiro, RJ",
  },
  {
    email: "beatriz.melo@example.com",
    name: "Beatriz Melo",
    phone: "31976543210",
    birthDate: new Date("1990-08-14"),
    address: "Rua do Contorno, 45, Santa Efigênia, Belo Horizonte, MG",
  },
  {
    email: "thiago.rocha@example.com",
    name: "Thiago Rocha",
    phone: "21976543210",
    birthDate: new Date("1983-09-30"),
    address: "Avenida Copacabana, 700, Copacabana, Rio de Janeiro, RJ",
  },
  {
    email: "viviane.ferreira@example.com",
    name: "Viviane Ferreira",
    phone: "61976543210",
    birthDate: new Date("1986-05-22"),
    address: "Rua de Itamaracá, 100, Asa Norte, Brasília, DF",
  },
  {
    email: "marcos.nunes@example.com",
    name: "Marcos Nunes",
    phone: "61912346578",
    birthDate: new Date("1990-01-17"),
    address: "Rua W3 Sul, 234, Brasília, DF",
  },
  {
    email: "karla.souza@example.com",
    name: "Karla Souza",
    phone: "27976543210",
    birthDate: new Date("1993-11-04"),
    address: "Avenida do Sol, 12, Vila Nova, Vitória, ES",
  },
];

export async function main() {
  for (const [index, user] of users.entries()) {
    console.log(`Creating user ${index + 1} of ${users.length}`);
    await prisma.user.create({
      data: user,
    });
  }
}

main();
