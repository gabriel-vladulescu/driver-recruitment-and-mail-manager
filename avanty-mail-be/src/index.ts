import express from 'express';
import env from './config/env';
import sequelize from './config/database';
import router from './routes';
import { errorMiddleware } from './middleware/errorMiddleware';
import { notFoundMiddleware } from './middleware/notFoundMiddleware';
import { bodyParserMiddleware } from './middleware/bodyParserMiddleware';
import { securityMiddleware } from './middleware/securityMiddleware';

const app = express();
app.use(securityMiddleware());
app.use(bodyParserMiddleware());
app.use('/api', router);
app.use('*', notFoundMiddleware);
app.use(errorMiddleware);

// Start server
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
    
    app.listen(env.PORT, () => {
      console.log(`Server running on http://localhost:${env.PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`CORS allowed origins: ${env.ALLOWED_ORIGINS}`);
      console.log('Server started successfully!');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
})();