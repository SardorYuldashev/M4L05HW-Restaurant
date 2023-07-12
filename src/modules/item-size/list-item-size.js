import db from '../../db/index.js';

export const listItemSizes = (filter = {}) => {
  return db('item_sizes').where({ ...filter, is_deleted: false }).select('*');
};