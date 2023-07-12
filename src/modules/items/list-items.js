import db from '../../db/index.js';

export const listItems = (filter = {}) => {
  return db('items').where({ ...filter, is_deleted: false }).select('*');
};