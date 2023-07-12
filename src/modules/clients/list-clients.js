import db from '../../db/index.js';

export const listClients = (filter = {}) => {
  return db('clients').where(filter).select('*');
};