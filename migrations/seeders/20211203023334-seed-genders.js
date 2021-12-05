'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('genders', [{
      id: 1,
      name: 'Not specified'
    }, {
      id: 2,
      name: 'Male'
    }, {
      id: 3,
      name: 'Female'
    }, {
      id: 4,
      name: 'Custom'
    }, {
      id: 5,
      name: 'Prefer Not To Say'
    }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('genders', null, {});
  }
};
