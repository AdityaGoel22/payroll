import express from 'express';
import { getTicket, raiseATicket } from '../Controllers/ticketController.js';

const router = express.Router();

router.post('/raise-a-ticket', raiseATicket);
router.get('/get-ticket-details', getTicket);

export default router;