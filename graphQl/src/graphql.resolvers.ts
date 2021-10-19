import { PrismaClient } from "@prisma/client";
import { hashSync } from 'bcryptjs';
import { User } from ".prisma/client";

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    async allUsers(): Promise<User[]> {
      return await prisma.user.findMany();
    },
    async user(_: Object, { id }: User): Promise<User | null> {
      return await prisma.user.findUnique({ where: { id } });
    },
  },
  Mutation: {
		async createUser(_: Object, { email, name, password }: User): Promise<User | null> {
			const hashedPasword = hashSync(password, 10);
			const createdUser = await prisma.user.create({ data: { email, name, password: hashedPasword } });
			return await prisma.user.findUnique({ where: { id: createdUser.id } });
		},
  },
};

export { resolvers };
