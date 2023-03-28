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
});
