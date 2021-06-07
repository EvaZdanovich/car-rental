import prisma from "../../prisma/prisma";
import argon2 from "argon2-browser";
import withSession from "../../libs/session";
export default withSession(
    async (req, res) => {
     
        const json = JSON.parse(req.body);
        req.session.destroy();
        await req.session.save();
   
        const foundUser = await prisma.user.findUnique({ where: { mail: json.email } })
        if(!foundUser) {
            res.status(500).end();
            return;
        }
        console.log("JSON",json)
        argon2.verify({
            encoded: foundUser.password,
            pass: json.password,
        }).then(
            
           async ()=>{
                req.session.set("user", foundUser.mail);
            
                await req.session.save();
                // if(foundUser.isAdmin) res.redirect("/admin")
                res.status(200).send("OK");
                res.end()
                return;
            }
        )
            .catch(e => { console.error(e.message, e.code) 
                res.status(500).send("WRONG")
                res.end()
                return;
                         
                      })
        
        // res.end();
        
    }) 