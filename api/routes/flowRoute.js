import express from 'express';
import { getAllFlows, runFlow, saveFlows } from '../controllers/flowCotrollers.js';


const router = express.Router();


router.get('/',getAllFlows);
router.post('/',saveFlows);
router.post('/run',runFlow);

export default router;