import { Request, Response } from 'express';
import UsersService from '../services/users.service';

class UsersController {
  constructor(private _service = new UsersService()) { }

  public login = async (req: Request, res: Response) => {
    const credentials = req.body;

    const token = await this._service.login(credentials);
    if (token === null) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    return res.status(200).json({ token });
  };
}

export default UsersController;
