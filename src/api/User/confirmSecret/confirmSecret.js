import { makePrismaClientClass } from "prisma-client-lib";

import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    confirmSecret: async (_, args) => {
      const { secret, email } = args;
      const user = await prisma.user({ email });
      if (user.loginSecret === secret) {
        return "TOKEN"
      } else {
        throw Error("Wrong email/secret combination")
      }
    }
  }
}