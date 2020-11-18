import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { userName, firstName, lastName, email, bio, avatar } = args;
      const { user } = request;
      return prisma.updateUser({
        where: {
          id: user.id
        },
        data: {
          userName, firstName, lastName, email, bio, avatar
        }
      })
    }
  }
}