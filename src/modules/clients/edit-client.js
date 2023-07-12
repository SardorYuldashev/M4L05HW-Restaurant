import bcryptjs from 'bcryptjs';
import db from '../../db/index.js';
import { NotFoundError } from '../../shared/errors/index.js';

export const editClient = async ({ id, ...changes }) => {
  const client = await db('clients').where({ id }).first();

  if (!client) {
    throw new NotFoundError('Mijoz topilmadi');
  }

  let passwordChange = {};
  if (changes.password) {
    passwordChange.password = await bcryptjs.hash(changes.password, 10);
  }

  return (
    await db('clients')
      .where({ id })
      .update({ ...changes, ...passwordChange })
      .returning('*')
  )[0];
};
