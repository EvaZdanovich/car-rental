
import prisma from "../prisma/prisma";

export default async function getEmployeeFromSession(req) {
  const user = req.session.get("employee");
  if(user) {
    
    const employee = await prisma.employee.findUnique({
      where: { mail: user },
    });
    return {props:{ employee:employee }}
  }
 
  return { props: { employee: null } };
}
