module.exports = (sequelize, DataTypes) => {
  let Users = sequelize.define(
    'Users',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        description: 'User unique identification (PK)'
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        description: "User's name "
      },
      last_name: {
        type: DataTypes.STRING,
        unique: 'users_enterprise_email_unique_idx',
        description: "User's last_name"
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        description: 'Record was created at this date'
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        description: 'Record was updated at this date'
      },
      deleted_at: {
        type: DataTypes.DATE,
        description: 'Record deleted at'
      },
      password: {
        type: DataTypes.STRING,
        description: "User's password"
      },
      cpf: {
        type: DataTypes.STRING,
        defaultValue: false,
        unique: 'cpf_index',
        description: "User's cpf"
      },
      address_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: {
          model: 'address',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        },
        description: 'Address belongs to this user (FK)'
      }
    },
    { tableName: 'users' }
  )
  if (typeof Users === 'undefined') return

  Users.associate = db => {
    Users.belongsTo(db.Address, { as: 'address' })
    Users.hasMany(db.Debt, { as: 'debts', foreignKey: 'user_id' })
  }
  Users.addScopes = db => {
    Users.addScope('main', {
      attributes: ['name', 'last_name', 'cpf', 'id'],
      include: [
        { model: db.Address.scope('compact'), as: 'address' },
        { model: db.Debt.scope('compact'), as: 'debts' }
      ]
    })
  }
  return Users
}
