import * as jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/IUser';

const tokenSecret:jwt.Secret = process.env.JWT_SECRET || 'greatefulDead';

const config: jwt.SignOptions = {
  expiresIn: '3d',
  algorithm: 'HS256',
};

const tokenGenerate = (payload: IUser) => jwt.sign(payload, tokenSecret, config);

const tokenValidate = (token: string) => jwt.verify(token, tokenSecret);

export {
  tokenGenerate,
  tokenValidate,
};
