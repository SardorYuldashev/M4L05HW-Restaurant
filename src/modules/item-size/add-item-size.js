import db from '../../db/index.js';

export const addItemSize = async (payload) => {
  console.log(payload);
  const result = await db('item_sizes')
    .insert(payload)
    .returning('*');

  return result[0];
};