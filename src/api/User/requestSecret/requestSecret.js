import { prisma } from "../../../../generated/prisma-client";
import { generateSecret, sendSecretMail } from "../../../utils";
export default {
  Mutation: {
    requestSecret: async (_, args) => {
      const { email } = args;
      const loginSecret = generateSecret();
      const existingEmail = await prisma.$exists.user({ email });
      try {
        //console.log(email);
        //console.log(existingEmail);
        if (existingEmail === true) {
          await sendSecretMail(email, loginSecret);
          await prisma.updateUser({ data: { loginSecret }, where: { email } });
        } else {
          throw Error("Email not found");
        }
        return true;
      } catch (error) {
        //console.log(error)
        return false;
      }
    }
  }
}