'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('comments_likes', { 
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
      comment_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: { 
          model: { 
            //schema: 'public',
            tableName: 'comments'
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
        user_comment_unique: {
          fields: ['user_id', 'comment_id']
        }
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('comments_likes');
  }
};
