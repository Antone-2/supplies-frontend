import jwt from 'jsonwebtoken';
import config from '../config/index';

export function signToken(payload: object, expiresIn = config.JWT_EXPIRES_IN) {
  return jwt.sign(payload, config.jwtSecret, { expiresIn });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch (err) {
    return null;
  }
}