'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      create policy "Posts images are publicly accessible."
        on storage.objects for select
        using ( bucket_id = 'posts' );

      create policy "Anyone can upload an image post."
        on storage.objects for insert
        with check ( bucket_id = 'posts' );

      create policy "Anyone can delete an image post."
        on storage.objects for delete
        using ( bucket_id = 'posts' );
    `)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      drop policy "Anyone can delete an image post."
        on storage.objects;

      drop policy "Anyone can upload an image post."
        on storage.objects;

      drop policy "Posts images are publicly accessible."
        on storage.objects;
    `)
  }
};
