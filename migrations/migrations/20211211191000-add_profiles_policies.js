'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      alter table profiles enable row level security;
    `)

    await queryInterface.sequelize.query(`
      create policy "Public profiles are viewable by everyone."
      on profiles for select
      using ( true );
    `)

    await queryInterface.sequelize.query(`
      create policy "Users can insert their own profile."
      on profiles for insert
      with check ( auth.uid() = id );
    `)

    await queryInterface.sequelize.query(`
      create policy "Users can update own profile."
      on profiles for update
      with check ( auth.uid() = id );
    `)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      drop policy "Users can update own profile."
      on profiles;
    `)

    await queryInterface.sequelize.query(`
      drop policy "Users can insert their own profile."
      on profiles;
    `)

    await queryInterface.sequelize.query(`
      drop policy "Public profiles are viewable by everyone."
      on profiles;
    `)

    await queryInterface.sequelize.query(`
      alter table profiles disable row level security;
    `)
  }
};
