import * as jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/IUser';

const tokenSecret:jwt.Secret = process.env.JWT_SECRET || 'greatefulDead';

// export default class Token {
//   const config: jwt.SignOptions = {
//     expiresIn: '1d',
//     algorithm: 'HS256',
//   };

//   static tokenGenerate = (payload: ILogin) => jwt.sign(payload, tokenSecret, config);

//   static tokenValidate = async (token: string) => jwt.verify(token, tokenSecret);
// }

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
