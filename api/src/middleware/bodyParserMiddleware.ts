import express, { Request, Response, NextFunction } from 'express';

export function bodyParserMiddleware() {
  const router = express.Router();

  // Body parsing with UTF-8 support
  router.use(
    express.json({
      limit: '10mb',
      type: ['application/json', 'text/plain'],
    })
  );

  router.use(
    express.urlencoded({
      extended: true,
      limit: '10mb',
    })
  );

  // Ensure UTF-8 encoding
  router.use((req: Request, res: Response, next: NextFunction) => {
    if (!req.headers['content-type']) {
      req.headers['content-type'] = 'application/json; charset=utf-8';
    }
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
  });

  return router;
}