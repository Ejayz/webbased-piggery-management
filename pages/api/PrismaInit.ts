import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = new PrismaClient({ log: ["query"] });
export const prismaCustomTbl_Users = new PrismaClient({
  log: ["query"],
}).$extends({
  result: {
    tbl_users: {
      name: {
        needs: {
          first_name: true,
          middle_name: true,
          last_name: true,
        },
        compute(tbl_users) {
          return `${tbl_users.first_name} ${tbl_users.middle_name} ${tbl_users.last_name}`;
        },
      },
    },
  },
});

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
