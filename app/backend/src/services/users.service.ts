import { ModelStatic } from 'sequelize';
import * as bcryptjs from 'bcryptjs';
import { tokenGenerate } from '../helpers/tokenCreate';
import { ILogin } from '../interfaces/ILogin';
import UsersModel from '../database/models/users.model';

class UsersService {
  protected model: ModelStatic<UsersModel> = UsersModel;

  login = async (credentials: ILogin): Promise<string | null> => {
    const data = await this.model.findOne({ where: { email: credentials.email } });
    if (!data) return null;

    const decryptPass = bcryptjs.compareSync(credentials.password, data.password);

    if (!decryptPass) return null;

    const { id, username, role, email } = data;

    const token = tokenGenerate({ id, username, role, email });
    return token;
  };
}

export default UsersService;
