'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('profiles', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        references: {
          model: {
            schema: 'auth',
            tableName: 'users'
          },
          key: 'id'
        }
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING(20),
        unique: true
      },
      fullname: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      avatar_url: {
        type: Sequelize.STRING(40)
      },
      website: {
        allowNull: false,
        type: Sequelize.STRING(100),
        defaultValue: ''
      },
      bio: {
        allowNull: false,
        type: Sequelize.TEXT,
        defaultValue: ''
      },
      gender_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'genders'
          },
          key: 'id'
        },
        defaultValue: 1
      },
      disable: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('profiles');
  }
};
