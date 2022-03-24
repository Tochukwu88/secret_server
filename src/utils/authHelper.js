import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';

import { JWT_SECRET } from '../config/keys';

export const hashPassword = password => {
  const salt = genSaltSync();
  return hashSync(password, salt);
};

export const comparePassword = (password, hashedPassword) => {
  return compareSync(password, hashedPassword);
};

export const generateToken = (payload, expIn) => {
  return sign(payload, JWT_SECRET, { expiresIn: expIn });
};

export const verifyToken = token => {
  return verify(token, JWT_SECRET);
};
