const debtRepository = require('../repository/debts.repository');

class DebtUseCases {
  async createDebt(data, userId) {
    if (!data.name || !data.amount || !data.note || !data.dueDate) {
      throw new Error('All fields are required');
    }

    if (data.amount <= 0) {
      throw new Error('Amount must be positive');
    }

    if (new Date(data.dueDate) <= new Date()) {
      throw new Error('Due date must be in the future');
    }

    return await debtRepository.create({
      ...data,
      userId,
      status: 'pending'
    });
  }

  async getUserDebts(userId, filter) {
    return await debtRepository.findByUserId(userId, filter);
  }

  async confirmDebtPayment(debtId, userId) {
    const debt = await debtRepository.findById(debtId);
    
    if (!debt) {
      throw new Error('Debt not found');
    }

    if (debt.userId !== userId) {
      throw new Error('Unauthorized');
    }

    if (debt.status !== 'approved') {
      throw new Error('Only approved debts can be marked as paid');
    }

    return await debtRepository.update(debtId, { status: 'paid_pending' });
  }

  async adminApproveDebt(debtId, feedback) {
    const debt = await debtRepository.findById(debtId);
    
    if (!debt) {
      throw new Error('Debt not found');
    }

    if (debt.status !== 'pending') {
      throw new Error('Only pending debts can be approved');
    }

    return await debtRepository.update(debtId, {
      status: 'approved',
      feedbackAdmin: feedback
    });
  }

  async adminRejectDebt(debtId, feedback) {
    const debt = await debtRepository.findById(debtId);
    
    if (!debt) {
      throw new Error('Debt not found');
    }

    if (debt.status !== 'pending') {
      throw new Error('Only pending debts can be rejected');
    }

    return await debtRepository.update(debtId, {
      status: 'rejected',
      feedbackAdmin: feedback
    });
  }

  async adminVerifyPayment(debtId, feedback) {
    const debt = await debtRepository.findById(debtId);
    
    if (!debt) {
      throw new Error('Debt not found');
    }

    if (debt.status !== 'paid_pending') {
      throw new Error('Only paid_pending debts can be verified');
    }

    return await debtRepository.update(debtId, {
      status: 'paid',
      feedbackAdmin: feedback
    });
  }

  async adminGetAllDebts(filter) {
    return await debtRepository.findAll(filter);
  }
}

module.exports = new DebtUseCases();
