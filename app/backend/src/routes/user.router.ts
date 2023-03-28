import { Request, Response, Router } from 'express';
import {
  validateBody,
  validateEmail,
  validatePassword,
  validateToken } from '../middlewares/loginValidator';
import UsersController from '../controllers/users.controller';
import UsersService from '../services/users.service';

const router = Router();

const userService = new UsersService();
const usersController = new UsersController(userService);

router.post(
  '/',
  validateBody,
  validateEmail,
  validatePassword,
  (req: Request, res: Response) => usersController.login(req, res),
);

router.get(
  '/role',
  validateToken,
  (req: Request, res: Response) => usersController.userRole(req, res),
);

export default router;
