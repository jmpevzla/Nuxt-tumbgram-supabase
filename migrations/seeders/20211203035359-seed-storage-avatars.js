'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert({ tableName: 'buckets', schema: 'storage' },
    [{
      id: 'avatars',
      name: 'avatars'
    }], {});

    // await queryInterface.sequelize.query(`
    //   create policy "Avatar images are publicly accessible."
    //     on storage.objects for select
    //     using ( bucket_id = 'avatars' );

    //   create policy "Anyone can upload an avatar."
    //     on storage.objects for insert
    //     with check ( bucket_id = 'avatars' );
    // `)

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete({ tableName: 'buckets', schema: 'storage' },
    {
      id: 'avatars'
    }, {});

  }
};
