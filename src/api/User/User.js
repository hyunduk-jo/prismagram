import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    fullName: (parent) => {
      return `${parent.firstName} ${parent.lastName}`;
    },
    isFollowing: async (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      try {
        return await prisma.$exists.user({
          AND: [{ id: user.id }, { following_some: { id: parentId } }]
        })
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    isSelf: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    },
    posts: parent => prisma.user({ id: parent.id }).posts(),
    rooms: parent => prisma.user({ id: parent.id }).rooms(),
    following: parent => prisma.user({ id: parent.id }).following(),
    followers: parent => prisma.user({ id: parent.id }).followers(),
    likes: parent => prisma.user({ id: parent.id }).likes(),
    comments: parent => prisma.user({ id: parent.id }).comments()
  }
}