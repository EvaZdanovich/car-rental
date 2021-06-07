import prisma from "../../../prisma/prisma";
export default async function addCar(req,res) {
     
     
    const id = parseInt(req.body);
     
    const car = await prisma.car.delete({where:{id:id}})
    // console.log(car)
    res.status(200).send(car);
    // return cars;
}