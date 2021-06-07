import prisma from "../../../prisma/prisma";
export default async function addCar(req,res) {
     
     
    const json = JSON.parse(req.body);
     
     const car = await prisma.car.create({data:json})
    // const cars = await prisma.car.findMany();
    console.log(car)
    res.status(200).send(car);
    // return cars;
}