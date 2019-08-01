module.exports = (sequelize, DataTypes) => {
  let Debt = sequelize.define(
    'Debt',
    {
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
    },
    { tableName: 'debt' }
  )
  if (typeof Debt === 'undefined') return
  return Debt
}
