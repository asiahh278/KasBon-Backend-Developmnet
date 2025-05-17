const express = require('express');
const router = express.Router();
const debtController = require('../controllers/debt.controller');
const authMiddleware = require('../middleware/auth.middleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Debt:
 *       type: object
 *       required:
 *         - name
 *         - amount
 *         - note
 *         - dueDate
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the debt
 *         name:
 *           type: string
 *           description: The name of the debt
 *         amount:
 *           type: number
 *           description: The amount of the debt
 *         note:
 *           type: string
 *           description: Additional notes about the debt
 *         dueDate:
 *           type: string
 *           format: date
 *           description: The due date of the debt
 *         status:
 *           type: string
 *           enum: [pending, approved, rejected, paid_pending, paid]
 *           description: The current status of the debt
 */

/**
 * @swagger
 * /api/debts:
 *   post:
 *     summary: Create a new debt
 *     tags: [Debts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - amount
 *               - note
 *               - dueDate
 *             properties:
 *               name:
 *                 type: string
 *               amount:
 *                 type: number
 *               note:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Debt created successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 */
router.post('/', authMiddleware, debtController.createDebt);

/**
 * @swagger
 * /api/debts:
 *   get:
 *     summary: Get all debts for the authenticated user
 *     tags: [Debts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, approved, rejected, paid_pending, paid]
 *         description: Filter debts by status
 *     responses:
 *       200:
 *         description: List of debts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Debt'
 *       401:
 *         description: Unauthorized
 */
router.get('/', authMiddleware, debtController.getUserDebts);

/**
 * @swagger
 * /api/debts/{id}/confirm:
 *   post:
 *     summary: Confirm payment for a debt
 *     tags: [Debts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Debt ID
 *     responses:
 *       200:
 *         description: Payment confirmed successfully
 *       400:
 *         description: Invalid debt status
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Debt not found
 */
router.post('/:id/confirm', authMiddleware, debtController.confirmPayment);

/**
 * @swagger
 * /api/admin/debts:
 *   get:
 *     summary: Get all debts (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, approved, rejected, paid_pending, paid]
 *         description: Filter debts by status
 *     responses:
 *       200:
 *         description: List of all debts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Debt'
 *       401:
 *         description: Unauthorized
 */
router.get('/admin', authMiddleware, debtController.adminGetAllDebts);

/**
 * @swagger
 * /api/admin/debts/{id}/approve:
 *   post:
 *     summary: Approve a debt (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Debt ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - feedback
 *             properties:
 *               feedback:
 *                 type: string
 *     responses:
 *       200:
 *         description: Debt approved successfully
 *       400:
 *         description: Invalid debt status
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Debt not found
 */
router.post('/admin/:id/approve', authMiddleware, debtController.adminApproveDebt);

/**
 * @swagger
 * /api/admin/debts/{id}/reject:
 *   post:
 *     summary: Reject a debt (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Debt ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - feedback
 *             properties:
 *               feedback:
 *                 type: string
 *     responses:
 *       200:
 *         description: Debt rejected successfully
 *       400:
 *         description: Invalid debt status
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Debt not found
 */
router.post('/admin/:id/reject', authMiddleware, debtController.adminRejectDebt);

/**
 * @swagger
 * /api/admin/debts/{id}/verify:
 *   post:
 *     summary: Verify a debt payment (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Debt ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - feedback
 *             properties:
 *               feedback:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment verified successfully
 *       400:
 *         description: Invalid debt status
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Debt not found
 */
router.post('/admin/:id/verify', authMiddleware, debtController.adminVerifyPayment);

module.exports = router; 