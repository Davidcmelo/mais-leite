
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const fazenda = req.body.fazenda;
    const litros = req.body.litros;
    const valor = req.body.valor;
    const contaFinal = req.body.contaFinal;
    const dataPagamento = req.body.dataPagamento;

    await prisma.pagamento.create({
      data: {
        fazenda: fazenda,
        litros: litros,
        valor: valor,
        contaFinal,
        dataPagamento
        
      },
    });

    console.log('Dados do resumo salvos com sucesso!');
    res.status(200).json({ message: 'Dados do resumo salvos com sucesso!' });
  } catch (error) {
    console.error('Erro ao salvar os dados do resumo:', error);
    res.status(500).json({ error: 'Erro ao salvar os dados do resumo' });
  }
}