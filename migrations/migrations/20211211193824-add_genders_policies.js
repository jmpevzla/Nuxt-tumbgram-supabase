'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      alter table genders enable row level security;
    `)

    await queryInterface.sequelize.query(`
      create policy "Genders are viewable by everyone."
      on genders for select
      using ( true );
    `)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      drop policy "Genders are viewable by everyone."
      on genders;
    `)

    await queryInterface.sequelize.query(`
      alter table genders disable row level security;
    `)
  }
};

