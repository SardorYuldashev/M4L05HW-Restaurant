import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../shared/config/index.js';
import db from '../../db/index.js';
import { UnauthorizedError } from '../../shared/errors/index.js';

export const loginClient = async ({ phone_number, password }) => {
  const existing = await db('clients').where({ phone_number }).first();

  if (!existing) {
    throw new UnauthorizedError('Telefon raqam yoki password xato');
  };

  const match = await bcryptjs.compare(password, existing.password);
  if (!match) {
    throw new UnauthorizedError('Telefon raqam yoki password xato');
  };

  const payload = { user: { id: existing.id, role: "client" } };
  const token = jwt.sign(payload, config.jwt.secret, { expiresIn: '5h' });

  return { token };
};
