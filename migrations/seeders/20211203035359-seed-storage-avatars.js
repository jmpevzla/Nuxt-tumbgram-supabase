'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert({ tableName: 'buckets', schema: 'storage' }, 
    [{
      id: 'avatars',
      name: 'avatars'
    }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete({ tableName: 'buckets', schema: 'storage' }, 
    {
      id: 'avatars'
    }, {});
     
  }
};
