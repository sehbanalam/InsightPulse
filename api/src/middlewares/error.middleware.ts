import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;

  console.error(`[❌ Error] ${req.method} ${req.url}`);
  console.error(err);

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env['NODE_ENV'] === 'development' && { stack: err.stack }),
  });
};
