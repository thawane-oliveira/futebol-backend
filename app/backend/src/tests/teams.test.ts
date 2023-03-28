import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';
import Teams from '../database/models/teams.model';
import teamsMock from './mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /teams', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Teams, "findAll")
      .resolves(teamsMock as Teams[]);
  });

  after(() => {
    (Teams.findAll as sinon.SinonStub).restore();
  })

  it('Verifica se ao entrar na rota /teams com método GET retorna um array de times', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams')

    expect(chaiHttpResponse.body).to.be.deep.equal(teamsMock)
    expect(chaiHttpResponse.status).to.be.equal(200)
  });

  before(async () => {
    sinon
      .stub(Teams, "findByPk")
      .resolves(teamsMock[0] as Teams);
  });

  after(() => {
    (Teams.findByPk as sinon.SinonStub).restore();
  })


  it('Verifica se ao entrar na rota /teams/:id com método GET retorna um time respectivo ao id de parâmetro', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams/1')

    expect(chaiHttpResponse.body).to.be.deep.equal(teamsMock[0])
    expect(chaiHttpResponse.status).to.be.equal(200)
  });
});
