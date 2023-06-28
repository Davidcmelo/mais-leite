import { NextApiRequest, NextApiResponse } from "next";

export default async function delet(req: NextApiRequest, res: NextApiResponse) {
    

    if(req.method === 'DELETE') {
    try {
        const result = await prisma.fazendas.delete({
            where: {
                id: Number(req.query.id)
            },
        });

       return res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Erro ao excluir o post." });
    }
    }
}