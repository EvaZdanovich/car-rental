import prisma from "../../prisma/prisma";
export default async function getCars(req,res) {
     
    const cars = await prisma.car.findMany();
    console.log(cars)
    res.status(200).send(cars);
    // return cars;
}