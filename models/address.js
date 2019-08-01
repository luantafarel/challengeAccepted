module.exports = (sequelize, DataTypes) => {
  let Address = sequelize.define('Address', {
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
  }, { tableName: 'address' })
  if (typeof Address === 'undefined') return
  return Address
}
