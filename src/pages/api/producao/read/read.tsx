import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../lib/prisma';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
      try {
        const litros = await prisma.litros.findMany({
            select: {
                id: true,
                litros: true,
                fazenda: {
                  select: {
                    id: true,
                    fazenda: true,
                  },
                },
                dataColeta: true,
              },
        }); // Busca todos os registros de litros na tabela "producao"
        res.json(litros);
      
       
        return
      } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar os dados' });
      }
    } else {
      res.status(405).json({ error: 'Método não permitido' });
    }
  }