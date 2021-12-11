'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      create policy "Avatar images are publicly accessible."
        on storage.objects for select
        using ( bucket_id = 'avatars' );

      create policy "Anyone can upload an avatar."
        on storage.objects for insert
        with check ( bucket_id = 'avatars' );

      create policy "Anyone can delete an avatar."
        on storage.objects for delete
        using ( bucket_id = 'avatars' );
    `)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      drop policy "Anyone can delete an avatar."
        on storage.objects;

      drop policy "Anyone can upload an avatar."
        on storage.objects;

      drop policy "Avatar images are publicly accessible."
        on storage.objects;
    `)
  }
};
