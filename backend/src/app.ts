import express from 'express';
import cors from 'cors';
import { PORT, SERVICE_NAME } from './config';
import { handleErrors } from '~/middlewares/error-handler';
import { routes } from '~/routes';
import { connectToDatabase } from './services/db';

(async function start() {
  try {
    const app = express();
    await connectToDatabase();

    app
      .use(express.json({ limit: '10mb' }))
      .use(cors({ origin: '*' }))
      .use(routes)
      .use(handleErrors);

    app.listen(PORT, function () {
      console.log(`${SERVICE_NAME} server started at port ${PORT}`);
    });
  } catch (error) {
    console.error('The app has crashed', { error });
  }
})();
