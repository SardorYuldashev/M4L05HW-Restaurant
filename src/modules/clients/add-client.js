import bcryptjs from 'bcryptjs';
import db from '../../db/index.js';

export const addClient = async (payload) => {
  const hashedPassword = await bcryptjs.hash(payload.password, 10);
  
  const result = await db('clients')
    .insert({ ...payload, password: hashedPassword })
    .returning('*');

  return result[0];
};
