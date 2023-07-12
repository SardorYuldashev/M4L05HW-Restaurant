import db from '../../db/index.js';
import { NotFoundError } from '../../shared/errors/index.js';

export const removeItemSize = async ({ id }) => {
  const size = await db('item_sizes').where({ id }).first();

  if (!size) {
    throw new NotFoundError("O'lcham topilmadi");
  };

  const deleted = await db('item_sizes')
    .where({ id })
    .update({ is_deleted: true })
    .returning(['id', 'price', 'size', 'photo']);

  return deleted[0];
};