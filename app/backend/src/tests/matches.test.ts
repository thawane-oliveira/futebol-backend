import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';
import Matches from '../database/models/matches.model';
import { createdMatch, matchMock } from './mocks/matches.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /matches', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Matches, "findAll")
      .resolves(matchMock as unknown as Matches[]);
  });

  after(() => {
    (Matches.findAll as sinon.SinonStub).restore();
  })

  it('Verifica se ao entrar na rota /matches com método GET retorna um array de partidas', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches')

    expect(chaiHttpResponse.body).to.be.deep.equal(matchMock)
    expect(chaiHttpResponse.status).to.be.equal(200)
  });

  it('Verifica se ao entrar na rota /matches com query de partida em progresso retorna um array de partidas', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches?inProgress=true')

    expect(chaiHttpResponse.body).to.be.an('array')
    expect(chaiHttpResponse.status).to.be.equal(200)
  });

  it('Verifica se ao entrar na rota /matches com query de partida que não está em progresso, retorna um array de partidas', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches?inProgress=false')

    expect(chaiHttpResponse.body).to.be.an('array')
    expect(chaiHttpResponse.status).to.be.equal(200)
  });
});

describe('Testes da rota /matches com método POST', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Matches, "create")
      .resolves(createdMatch as unknown as Matches);
  });

  after(() => {
    (Matches.create as sinon.SinonStub).restore();
  })

  it.skip('Verifica se ao entrar na rota /matches com método POST é possível criar uma nova partida', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      senha: 'secret_admin',
    });

    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjgwMTA1ODAyLCJleHAiOjE2ODAzNjUwMDJ9.nKTaX1xQ9G0vQETy2RovvAoRl5lLK7PlpBjY-7xxT9A')

    expect(chaiHttpResponse.body).to.be.equal(createdMatch)
    expect(chaiHttpResponse.status).to.be.equal(421)
  });
});
