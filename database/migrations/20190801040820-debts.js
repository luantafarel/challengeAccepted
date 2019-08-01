module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.createTable('debt', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
          description: 'Debt unique identification (PK)'
        },
        debt: {
          type: DataTypes.STRING,
          description: 'Represents what the debt is'
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          description: 'Record created at'
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
          description: 'Record updated at'
        },
        deleted_at: {
          type: DataTypes.DATE,
          description: 'Record deleted at'
        }
      })
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.dropTable('debt', { transaction: t })
    })
  }
}
