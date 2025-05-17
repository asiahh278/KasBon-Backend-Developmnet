const debtUseCases = require('../usecases/debts.usecases');

class DebtController {

  // @Summary "Create a new debt"
  // @Description "Create a new debt with the given name, amount, and note"
  // @Body "name, amount, note"
  // @Route "/api/debts"
  async createDebt(req, res) {
    try {
      const debt = await debtUseCases.createDebt(req.body, req.user.id);
      res.status(201).json(debt);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getUserDebts(req, res) {
    try {
      const debts = await debtUseCases.getUserDebts(req.user.id, req.query);
      res.json(debts);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async confirmPayment(req, res) {
    try {
      const debt = await debtUseCases.confirmDebtPayment(req.params.id, req.user.id);
      res.json(debt);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // @Summary "Approve a debt"
  // @Description "Approve a debt with the given feedback"
  // @Body "feedback"
  // @Route "/api/admin/debts/{id}/approve"
  async adminApproveDebt(req, res) {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
      }
      const debt = await debtUseCases.adminApproveDebt(req.params.id, req.body.feedback);
      res.json(debt);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // @Summary "Reject a debt"
  // @Description "Reject a debt with the given feedback"
  // @Body "feedback"
  // @Route "/api/admin/debts/{id}/reject"
  async adminRejectDebt(req, res) {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
      }
      const debt = await debtUseCases.adminRejectDebt(req.params.id, req.body.feedback);
      res.json(debt);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // @Summary "Verify a debt payment"
  // @Description "Verify a debt payment with the given feedback"
  // @Body "feedback"
  // @Route "/api/admin/debts/{id}/verify"
  async adminVerifyPayment(req, res) {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
      }
      const debt = await debtUseCases.adminVerifyPayment(req.params.id, req.body.feedback);
      res.json(debt);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // @Summary "Get all debts"
  // @Description "Get all debts with the given filter"
  // @Query "status"
  // @Route "/api/admin/debts"
  async adminGetAllDebts(req, res) {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
      }
      const debts = await debtUseCases.adminGetAllDebts(req.query);
      res.json(debts);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new DebtController();
