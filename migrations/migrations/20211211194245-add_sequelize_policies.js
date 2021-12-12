'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      alter table "SequelizeData" enable row level security;
    `)
    await queryInterface.sequelize.query(`
      alter table "SequelizeMeta" enable row level security;
    `)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      alter table "SequelizeMeta" disable row level security;
    `)
    await queryInterface.sequelize.query(`
      alter table "SequelizeData" disable row level security;
    `)
  }
};


