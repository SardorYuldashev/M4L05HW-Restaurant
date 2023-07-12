import db from '../../db/index.js';
import { NotFoundError } from '../../shared/errors/index.js';

export const showItem = async ({ id }) => {
  const item = await db('items').where({ id, is_deleted: false }).first();

  if (!item) {
    throw new NotFoundError('Taom topilmadi');
  };

  return item;
};