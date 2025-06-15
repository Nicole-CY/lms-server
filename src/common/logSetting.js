const winston = require('winston');
require('winston-daily-rotate-file');

// const isLocal = process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging';
const isLocal = false;
// Define transports
const transports = [];

// In local/dev environment, use file logging
if (isLocal) {
    transports.push(
        new winston.transports.DailyRotateFile({
            filename: 'logs/error_%DATE%.log',
            level: 'error',
            maxSize: '20m',
            maxFiles: '14d',
            useAuditFile: false,
        }),
        new winston.transports.DailyRotateFile({
            filename: 'logs/warn_%DATE%.log',
            level: 'warn',
            maxSize: '20m',
            maxFiles: '14d',
            useAuditFile: false,
        }),
        new winston.transports.DailyRotateFile({
            filename: 'logs/info_%DATE%.log',
            level: 'info',
            maxSize: '20m',
            maxFiles: '14d',
            useAuditFile: false,
        }),
        new winston.transports.DailyRotateFile({
            filename: 'logs/debug_%DATE%.log',
            level: 'debug',
            maxSize: '20m',
            maxFiles: '14d',
            useAuditFile: false,
        }),
        new winston.transports.DailyRotateFile({
            filename: 'logs/all_%DATE%.log',
        })
    );
}

// Always log to console
transports.push(
    new winston.transports.Console({
        format: isLocal ? winston.format.simple() : winston.format.json(),
    })
);

// Create logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports,
});

module.exports = logger;
