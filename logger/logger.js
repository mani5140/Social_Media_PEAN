const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, errors } = format;
const path = require('path');

const myFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
});

const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        errors({ stack: true }),
        myFormat
    ),
    transports: [
        new transports.File({ filename: path.join(__dirname, 'error.log'), level: 'error' }),
        new transports.File({ filename: path.join(__dirname, 'combined.log') })
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: combine(
            timestamp(),
            errors({ stack: true }),
            myFormat
        )
    }));
}

module.exports = logger;
