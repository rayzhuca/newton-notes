import NextAuth from "next-auth";
import authOption from "@/libs/authOptions";

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
