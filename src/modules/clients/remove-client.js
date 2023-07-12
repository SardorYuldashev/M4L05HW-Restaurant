import db from '../../db/index.js';
import { NotFoundError } from '../../shared/errors/index.js';

export const removeClient = async ({ id }) => {
  const client = await db('clients').where({ id }).first();

  if (!client) {
    throw new NotFoundError('Mijoz topilmadi');
  };

  const deleted = await db('clients')
    .where({ id })
    .delete()
    .returning(['id', 'first_name', 'last_name', 'phone_number']);

  return deleted[0];
};