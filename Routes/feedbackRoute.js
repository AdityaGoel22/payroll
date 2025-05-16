import express from 'express';
import { feedbackForm } from "../Controllers/feebackController.js";

const router = express.Router();

router.post('/submit-feedback', feedbackForm);

export default router;