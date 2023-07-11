import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma'; // Importe a instância do Prisma


export default async function handler(req: NextApiRequest, res: NextApiResponse){
    try {
        const { fazendaId, litros, dataColeta } = req.body;
        console.log("body", req.body)
        
        const result = await prisma.litros.create({
            data: {
               fazendaId,
               litros,
               dataColeta
            },
            
        });console.log("CRIAÇÃO", result)
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Opa imbecil, falta campos" });
    }

  }


  