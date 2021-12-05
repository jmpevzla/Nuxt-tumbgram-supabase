'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('comments', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { 
          model: { 
            //schema: 'public',
            tableName: 'profiles'
          },
          key: 'id' 
        }
      },
      post_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: { 
          model: { 
            //schema: 'public',
            tableName: 'posts'
          },
          key: 'id' 
        }
      },
      content: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('comments');
  }
};
