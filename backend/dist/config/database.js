"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const logger_1 = require("../utils/logger");
const globalForPrisma = globalThis;
exports.prisma = globalForPrisma.prisma ?? new client_1.PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});
if (process.env.NODE_ENV !== 'production')
    globalForPrisma.prisma = exports.prisma;
if (process.env.NODE_ENV === 'development') {
    exports.prisma.$use(async (params, next) => {
        const before = Date.now();
        const result = await next(params);
        const after = Date.now();
        logger_1.logger.debug(`Query ${params.model}.${params.action} took ${after - before}ms`);
        return result;
    });
}
//# sourceMappingURL=database.js.map