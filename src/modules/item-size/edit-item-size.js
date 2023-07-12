import db from '../../db/index.js';
import { NotFoundError } from '../../shared/errors/index.js';

export const editItemSize = async ({ id, ...changes }) => {
  const size = await db('item_sizes').where({ id }).first();

  if (!size) {
    throw new NotFoundError("O'lcham topilmadi");
  };

  return (
    await db('item_sizes')
      .where({ id })
      .update({ ...changes })
      .returning('*')
  )[0];
};
