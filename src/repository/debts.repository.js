const Debt = require('../entities/debts.entities');
const { Op } = require('sequelize');

class DebtRepository {
  async create(data) {
    return await Debt.create(data);
  }

  async findById(id) {
    return await Debt.findByPk(id);
  }

  async findByUserId(userId, filter = {}) {
    const where = { userId };
    if (filter.status) {
      where.status = filter.status;
    }
    return await Debt.findAll({ where });
  }

  async findAll(filter = {}) {
    const where = {};
    if (filter.status) {
      where.status = filter.status;
    }
    if (filter.userId) {
      where.userId = filter.userId;
    }
    return await Debt.findAll({ where });
  }

  async update(id, data) {
    const debt = await this.findById(id);
    if (!debt) return null;
    return await debt.update(data);
  }

  async findPending() {
    return await Debt.findAll({
      where: { status: 'pending' }
    });
  }

  async findPaidPending() {
    return await Debt.findAll({
      where: { status: 'paid_pending' }
    });
  }
}

module.exports = new DebtRepository();
