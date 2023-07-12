import db from '../../db/index.js';
import { NotFoundError } from '../../shared/errors/index.js';

export const removeItem = async ({ id }) => {
  const item = await db('items').where({ id }).first();

  if (!item) {
    throw new NotFoundError('Taom topilmadi');
  };

  const deleted = await db('items')
    .where({ id })
    .update({ is_deleted: true })
    .returning(['id', 'type']);

  return deleted[0];
};