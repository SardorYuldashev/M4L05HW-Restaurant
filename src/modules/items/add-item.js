import db from '../../db/index.js';

export const addItem = async (payload) => {
  const result = await db('items')
    .insert(payload)
    .returning('*');

  return result[0];
};