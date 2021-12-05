'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('posts_likes', { 
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
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    }, {
      uniqueKeys: {
        user_post_unique: {
          fields: ['user_id', 'post_id']
        }
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('posts_likes');
  }
};
