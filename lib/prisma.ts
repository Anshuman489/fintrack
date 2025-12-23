import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient();
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

//glovalThis.prisma is used to prevent multiple instances of Prisma Client in development
//environment due to hot reloading. In production, a single instance is sufficient.
//This setup ensures efficient database connections and resource management.