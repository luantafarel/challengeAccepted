module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.sequelize.transaction(async t => {
      await queryInterface.addColumn('debt', 'user_id', {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        }
      })
      await queryInterface.bulkInsert('address', [
        {
          street: '1',
          city: 'bh',
          state: 'mg',
          county: 'br'
        },
        {
          street: '2',
          city: 'bh',
          state: 'mg',
          county: 'br'
        },
        {
          street: '6',
          city: 'ipatinga',
          state: 'mg',
          county: 'br'
        },
        {
          street: '3',
          city: 'blumenau',
          state: 'sc',
          county: 'br'
        },
        {
          street: '4',
          city: 'Montevideo',
          state: 'test',
          county: 'uy'
        }
      ])
      await queryInterface.bulkInsert('users', [{
        cpf: '111',
        name: 'luan',
        last_name: 'test',
        address_id: 1
      }, {
        cpf: '222',
        name: 'j',
        last_name: 'j',
        address_id: 2
      }, {
        cpf: '333',
        name: 'o',
        last_name: 'o',
        address_id: 3
      }, {
        cpf: '444',
        name: 'j',
        last_name: 'o',
        address_id: 4
      }, {
        cpf: '555',
        name: 's',
        last_name: 't',
        address_id: 5
      }])
      await queryInterface.bulkInsert('debt', [
        {
          debt: '1',
          user_id: 1
        },
        {
          debt: '2',
          user_id: 1
        },
        {
          debt: '6',
          user_id: 2
        },
        {
          debt: '3',
          user_id: 2
        },
        {
          debt: '4',
          user_id: 2
        },
        {
          debt: '1',
          user_id: 3
        },
        {
          debt: '2',
          user_id: 4
        },
        {
          debt: '6',
          user_id: 4
        },
        {
          debt: '3',
          user_id: 4
        },
        {
          debt: '4',
          user_id: 5
        },
        {
          debt: '1',
          user_id: 5
        },
        {
          debt: '2',
          user_id: 5
        },
        {
          debt: '6',
          user_id: 5
        },
        {
          debt: '3',
          user_id: 5
        },
        {
          debt: '4',
          user_id: 5
        }
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async t => {})
  }
}
