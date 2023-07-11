import prisma from "../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST'){
    return Create(req,res)
  } else if (req.method === 'GET') {
    return Read(req, res);
  } else if (req.method === 'PUT') {
    return Update(req, res);
  } else if (req.method === 'DELETE') {
    return Delete(req, res);
  } 

  res.status(405).end(); 
}
  async function Create(req: NextApiRequest, res: NextApiResponse){
    try {
        const { fazenda, responsavel, endereco } = req.body;
        const result = await prisma.fazendas.create({
            data: {
                fazenda,
                responsavel,
                endereco,
            },
        });
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Opa imbecil, falta campos" });
    }
  }

async function Read(req: NextApiRequest, res: NextApiResponse) {
    try {
        const fazendas = await prisma.fazendas.findMany();
        res.status(200).json(fazendas);
    } catch (error) {
        res.status(500).json({ error: "Falha ao ler dados" });
    }
}


 async function Update(req: NextApiRequest, res: NextApiResponse) {
// const id = req.query.id ;

  
  const { fazenda, responsavel, endereco } = req.body;
    try{
      const result = await prisma.fazendas.update({
          where: {
              id:Number(req.query.id)
          },
         data: {
            
            fazenda,
            responsavel,
            endereco
           }
      });
    res.json(result);
    } catch (error){
      console.log("IDDDDDD", req.query.id)
      // console.log("IDDDDDD", id)
      console.log("erro do catch",error)
      res.status(500).json({error: "Erro ao atualizar"})
    }
}

async function Delete(req: NextApiRequest, res: NextApiResponse) {

    try {
        const result = await prisma.fazendas.delete({
            where: {
                id: req.query.id
            },
        });

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Erro ao excluir o post." });
    }
}


