import express from 'express';
import { addBoard, deleteBoard, editBoard, getAllBoards } from '../controllers/boards';

const router = express.Router();

router.get('/', getAllBoards);
router.post('/', addBoard);
router.delete('/:id', deleteBoard);
router.patch('/:id', editBoard);

export { router as boardsRoutes };
