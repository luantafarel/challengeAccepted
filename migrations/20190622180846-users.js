module.exports = {
  up: (queryInterface, DataTypes) => {
    const NOW = queryInterface.sequelize.literal('NOW()')
    return queryInterface.createTable('users', {
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
        defaultValue: NOW,
        description: 'Record was created at this date'
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: NOW,
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
        type: DataTypes.STRING,
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
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async t => {
      await queryInterface.dropTable('users', { transaction: t })
    })
  }
}
