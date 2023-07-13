import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const fazendas = await prisma.fazendas.findMany(); // Busca todos os registros de fazendas
      res.json(fazendas);
      return;
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar os dados' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}