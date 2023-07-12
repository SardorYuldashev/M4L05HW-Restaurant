import db from '../../db/index.js';
import { NotFoundError } from '../../shared/errors/index.js';

export const editItem = async ({ id, ...changes }) => {
  const item = await db('items').where({ id }).first();

  if (!item) {
    throw new NotFoundError('Taom topilmadi');
  }

  return (
    await db('items')
      .where({ id })
      .update({ ...changes })
      .returning('*')
  )[0];
};
