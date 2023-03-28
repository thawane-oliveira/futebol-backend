import Teams from '../database/models/Teams';

const getTeamsService = async () => {
  const data = await Teams.findAll();
  return data;
};

const xablau = () => null;

export { xablau, getTeamsService };
