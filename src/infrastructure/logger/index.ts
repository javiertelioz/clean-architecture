import winston from 'winston';

const { createLogger, format, transports } = winston;

const logFormat = format.printf(
  info => `${info.timestamp.split(' ')[1]} ${info.level}: ${JSON.stringify(info.message, null, 2)}`
);

const logger = createLogger({
  format: format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
  transports: [
    new transports.Console({
      format: format.combine(format.timestamp(), format.colorize(), format.simple(), logFormat)
    }),
    new winston.transports.File({
      filename: '/var/log/error.log',
      level: 'error',
      format: format.combine(format.json())
    }),
    new winston.transports.File({
      filename: '/var/log/combined.log',
      format: format.combine(format.json())
    })
  ]
});

export default class Logger {
  static log(message: string, details?: any) {
    logger.info({ message, details });
  }

  static error(message: string, details?: any) {
    logger.error({ message, details });
  }

  static warning(message: string, details?: any) {
    logger.warning({ message, details });
  }
}
