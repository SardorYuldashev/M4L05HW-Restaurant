import db from '../../db/index.js';
import { NotFoundError } from '../../shared/errors/index.js';

export const showClients = async ({ id }) => {
  const client = await db('clients').where({ id }).first();

  if (!client) {
    throw new NotFoundError('Mijoz topilmadi');
  };

  return client;
};