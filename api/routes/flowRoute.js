import express from 'express';
import { getAllFlows, runFlow, saveFlows } from '../controllers/flowCotrollers.js';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' })


const router = express.Router();


router.get('/',getAllFlows); 
router.post('/',saveFlows);
router.post('/run',upload.single("file"),runFlow);

export default router;