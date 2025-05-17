require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
const sequelize = require('./config/database');
const debtRoutes = require('./routes/debts.routes');
const userController = require('./controllers/users.controller');
const authMiddleware = require('./middleware/auth.middleware');

const app = express();

app.use(cors());
app.use(express.json());

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Auth routes
app.post('/api/auth/register', userController.register);
app.post('/api/auth/login', userController.login);
app.post('/api/auth/logout', authMiddleware, userController.logout);
app.get('/api/auth/profile', authMiddleware, userController.getProfile);

// Debt routes
app.use('/api/debts', debtRoutes);

// Admin routes
app.get('/api/admin/debts', authMiddleware, debtController.adminGetAllDebts);
app.post('/api/admin/debts/:id/approve', authMiddleware, debtController.adminApproveDebt);
app.post('/api/admin/debts/:id/reject', authMiddleware, debtController.adminRejectDebt);
app.post('/api/admin/debts/:id/verify', authMiddleware, debtController.adminVerifyPayment);

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Wait for database connection
    let retries = 5;
    while (retries > 0) {
      try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');
        break;
      } catch (error) {
        retries--;
        if (retries === 0) {
          throw error;
        }
        console.log(`Database connection failed. Retrying... (${retries} attempts left)`);
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds before retrying
      }
    }
    
    await sequelize.sync();
    console.log('Database synchronized successfully.');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
}

startServer(); 