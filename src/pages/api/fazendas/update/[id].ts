import { NextApiRequest, NextApiResponse } from "next";

export default async function post(req: NextApiRequest, res: NextApiResponse) {
    const { fazenda, responsavel, endereco } = req.body;

    if(req.method === 'PUT') {
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
            
            return res.json(result);
        } catch (error){
            console.log("IDDDDDD", req.query.id)
            // console.log("IDDDDDD", id)
            console.log("erro do catch",error)
            res.status(500).json({error: "Erro ao atualizar"})
        }
    }

}