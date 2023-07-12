import db from '../../db/index.js';
import { NotFoundError } from '../../shared/errors/index.js';

export const showItemSize = async ({ id }) => {
  const item = await db('item_sizes').where({ id, is_deleted: false }).first();

  if (!item) {
    throw new NotFoundError("O'lcham topilmadi");
  };

  return item;
};