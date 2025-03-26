import express from 'express';

//controllers
import { create, getAll, getCount, remove, update } from '../controllers/project-controller/index.js';


const router = express.Router();

router.post('/', create);
router.get('/', getAll);
router.put('/:id', update);
router.delete('/:id', remove);
router.get('/count', getCount);




export default router;
