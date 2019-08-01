module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.createTable('address', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
          description: 'Debt unique identification (PK)'
        },
        city: {
          type: DataTypes.STRING,
          description: 'Addr city'
        },
        street: {
          type: DataTypes.STRING,
          description: 'Addr street'
        },
        county: {
          type: DataTypes.STRING,
          description: 'Addr country'
        },
        state: {
          type: DataTypes.STRING,
          description: 'Addr country'
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
      await queryInterface.dropTable('address', { transaction: t })
    })
  }
}
