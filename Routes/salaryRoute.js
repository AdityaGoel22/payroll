import express from 'express';
import { SalaryDescription } from '../Controllers/salaryController.js';

const router = express.Router();

router.get('/salary-status', SalaryDescription);

export default router;