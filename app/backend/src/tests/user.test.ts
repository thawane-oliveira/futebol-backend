import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcryptjs from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';
import Users from '../database/models/users.model';
import {
  userMock,
  credentials,
  incorrectEmail,
  incorrectPassword,
  withoutEmail,
  withoutPassword,
  tokenMock
} from './mocks/user.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /login com sucesso', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves(userMock as Users);
  });

  after(() => {
    (Users.findOne as sinon.SinonStub).restore();
  })

  it('Verifica se ao entrar na rota /login com método POST e credenciais válidas, é possível logar no sistema', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(credentials)

    expect(chaiHttpResponse.body).to.have.property('token');
    expect(chaiHttpResponse.status).to.be.equal(200)
  });
});

describe('Testes da rota /login com erro', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves(null);
  });

  after(() => {
    (Users.findOne as sinon.SinonStub).restore();
  })

  it('Verifica se ao entrar na rota /login com um e-mail incorreto/inválido, não é possível logar no sistema', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(incorrectEmail)

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body.message).to.be.equal('Invalid email or password');
  });

  it('Verifica se ao entrar na rota /login com uma senha com menos de 6 caracteres, não é possível logar no sistema', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(incorrectPassword)

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body.message).to.be.equal('Invalid email or password');
  });

  it('Verifica se ao entrar na rota /login com uma senha incorreta/inválida, não é possível logar no sistema', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'zawarudo'
      })

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body.message).to.be.equal('Invalid email or password');
  });

  it('Verifica se ao entrar na rota /login sem e-mail, não é possível logar no sistema', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(withoutEmail)

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
  });

  it('Verifica se ao entrar na rota /login sem senha, não é possível logar no sistema', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(withoutPassword)

      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
  });
});

describe('Testes da rota /login/role', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves(userMock as Users);
  });

  after(() => {
    (Users.findOne as sinon.SinonStub).restore();
  })

  it('Verifica se ao entrar na rota /login/role com um token válido, é possível visualizar a role do usuário', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/role')
      .set('authorization', tokenMock)

   expect(chaiHttpResponse.status).to.be.equal(200);
   expect(chaiHttpResponse.body).to.have.property('role');
  });

  it('Verifica se ao entrar na rota /login/role com um token inválido, não é possível visualizar a role do usuário', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/role')
      .set('authorization', 'madeInHeaven')

   expect(chaiHttpResponse.status).to.be.equal(401);
   expect(chaiHttpResponse.body.message).to.be.equal('Token must be a valid token');
  });

  it('Verifica se ao entrar na rota /login/role sem um token, não é possível visualizar a role do usuário', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/role')

   expect(chaiHttpResponse.status).to.be.equal(401);
   expect(chaiHttpResponse.body.message).to.be.equal('Token not found');
  });
});


