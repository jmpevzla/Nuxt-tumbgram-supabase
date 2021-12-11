'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      alter table posts enable row level security;
    `)

    await queryInterface.sequelize.query(`
      create policy "Public posts are viewable by everyone."
      on posts for select
      using ( true );
    `)

    await queryInterface.sequelize.query(`
      create policy "Users can insert their own post."
      on posts for insert
      with check ( auth.uid() = user_id );
    `)

    await queryInterface.sequelize.query(`
      create policy "Users can update own post."
      on posts for update
      with check ( auth.uid() = user_id );
    `)

    await queryInterface.sequelize.query(`
      create policy "Users can delete own post."
      on posts for delete
      using ( auth.uid() = user_id );
    `)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      drop policy "Users can delete own post."
      on posts;
    `)

    await queryInterface.sequelize.query(`
      drop policy "Users can update own post."
      on posts;
    `)

    await queryInterface.sequelize.query(`
      drop policy "Users can insert their own post."
      on posts;
    `)

    await queryInterface.sequelize.query(`
      drop policy "Public posts are viewable by everyone."
      on posts;
    `)

    await queryInterface.sequelize.query(`
      alter table posts disable row level security;
    `)
  }
};

