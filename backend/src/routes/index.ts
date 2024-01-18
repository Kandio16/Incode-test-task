import express, { Request, Response } from 'express';
import { SERVICE_NAME } from '../config';
import { boardsRoutes } from './boards';

const router = express.Router();

router.get('/', getHealth);
router.use('/boards', boardsRoutes);

function getHealth(req: Request, res: Response) {
  res.status(200).json({
    ok: true,
    message: 'Healthy',
    serviceName: SERVICE_NAME,
  });
}

export { router as routes };
