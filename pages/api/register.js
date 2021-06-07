import prisma from "../../prisma/prisma";
import argon2 from "argon2-browser";
export default async function register(req, res) {
     
    const json = JSON.parse(req.body);
    console.log(json)
    const hash = await argon2.hash({
        pass: json.password,
        salt: "qweqweqyqweasdfshykuffghjsfagj",
    });
   
        json.zipCode=parseInt(json.zipCode)
        json.pesel=json.pesel+""
        json.password=hash.encoded.toString()
        console.log(json.password)
    let alreadyExists = false;
    const register = await prisma.user.create({ data: { adres: json.adres, firstName: json.firstName, lastName: json.lastName, mail: json.mail, password: json.password, pesel: json.pesel, telefon: json.telefon, zipCode: json.zipCode } })        
        .catch((err) => {
            if (err.code === "P2002") {
                // res.status(500).end("Podana wartość już istnieje");
                // return;
                alreadyExists = true
            }
          });
    if (alreadyExists) {
        res.status(500).end("Podana wartość już istnieje");
    } else {
        res.status(200).end("OK");
    }
    return;
    // const foundUser = await prisma.user.findUnique({where:{mail:json.email}});
    
    // if (foundUser.password == json.password) { res.status(200).end(); } else {
    //     res.status(500).end();    
    // }
    
    // return cars;
}