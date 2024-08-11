import type { NextApiRequest, NextApiResponse } from 'next';
import { controleEditora } from './index';

export default (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'GET') {
            const codEditora = Number(req.query.codEditora);
            const nomeEditora = controleEditora.getNomeEditora(codEditora);

            if (nomeEditora) {
                res.status(200).json({ nome: nomeEditora });
            } else {
                res.status(404).json({ message: 'Editora não encontrada' });
            }
        } else {
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};