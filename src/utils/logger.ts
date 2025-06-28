import winston from 'winston';

const { combine, timestamp, errors, json, printf, colorize } = winston.format;

const logLevel = process.env['LOG_LEVEL'] ?? 'info';
const isProduction = process.env['NODE_ENV'] === 'production';

const devFormat = printf(({ level, message, timestamp: ts, ...metadata }) => {
  let msg = `${ts} [${level}]: ${message}`;
  if (Object.keys(metadata).length > 0) {
    msg += ` ${JSON.stringify(metadata)}`;
  }
  return msg;
});

const logger = winston.createLogger({
  level: logLevel,
  format: combine(
    errors({ stack: true }),
    timestamp(),
    isProduction ? json() : combine(colorize(), devFormat),
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error', 'warn'],
      silent: process.env['MCP_MODE'] === 'true',
    }),
  ],
  exitOnError: false,
});

export function createLogger(context: string): winston.Logger {
  return logger.child({ context });
}

export default logger;