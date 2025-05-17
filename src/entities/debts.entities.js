const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./users.entities');

const Debt = sequelize.define('Debt', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected', 'paid_pending', 'paid'),
    defaultValue: 'pending'
  },
  feedbackAdmin: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

Debt.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Debt, { foreignKey: 'userId' });

module.exports = Debt;
