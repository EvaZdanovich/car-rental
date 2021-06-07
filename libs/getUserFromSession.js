
import prisma from "../prisma/prisma";

export default async function getUserFromSession(req) {
  const user = req.session.get("user");
  if(user) {
    
    const user1 = await prisma.user.findUnique({
      where: { mail: user },
    });
    return {props:{ user:user1 }}
  }
 
  return { props: { user: null } };
}
