import prisma from "../../prisma/prisma";
import argon2 from "argon2-browser";
import withSession from "../../libs/session";
import { useRouter } from 'next/router'

export default withSession(
    async (req, res) => {
     
      
        req.session.destroy();
        await req.session.save();
        // req.push().end();
       res.redirect('/')
        
    }) 


