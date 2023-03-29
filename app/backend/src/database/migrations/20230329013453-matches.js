'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      homeTeamId: {
        type: Sequelize.INTEGER,
        field: 'home_team_id',
        references: { model: 'teams', key: 'id' }
      },
      homeTeamGoals: {
        type: Sequelize.INTEGER,
        field: 'home_team_goals'
      },
      awayTeamId: {
        type: Sequelize.INTEGER,
        field: 'away_team_id',
        references: { model: 'teams', key: 'id' }
      },
      awayTeamGoals: {
        type: Sequelize.INTEGER,
        field: 'away_team_goals'
      },
      inProgress: {
        type: Sequelize.BOOLEAN,
        field: 'in_progress'
      },
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('matches');
  }
};