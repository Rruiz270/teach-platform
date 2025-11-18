"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const errorHandler_1 = require("../middleware/errorHandler");
const api_health_service_1 = require("../services/api-health.service");
const logger_1 = require("../utils/logger");
const router = (0, express_1.Router)();
router.get('/status', auth_1.authenticate, (0, errorHandler_1.asyncHandler)(async (req, res) => {
    logger_1.logger.info('API health status requested by user:', req.user?.id);
    const apiStatuses = await api_health_service_1.apiHealthService.checkAllAPIs();
    const userStatus = apiStatuses.map(api => ({
        name: api.name,
        provider: api.provider,
        status: api.status,
        isAvailable: api.status === 'connected'
    }));
    res.json({
        success: true,
        timestamp: new Date(),
        apis: userStatus
    });
}));
router.get('/detailed', auth_1.authenticate, (0, auth_1.authorize)('ADMIN', 'SUPER_ADMIN'), (0, errorHandler_1.asyncHandler)(async (req, res) => {
    logger_1.logger.info('Detailed API health status requested by admin:', req.user?.id);
    const apiStatuses = await api_health_service_1.apiHealthService.checkAllAPIs();
    res.json({
        success: true,
        timestamp: new Date(),
        apis: apiStatuses,
        summary: {
            total: apiStatuses.length,
            connected: apiStatuses.filter(api => api.status === 'connected').length,
            errors: apiStatuses.filter(api => api.status === 'error').length,
            noApiKey: apiStatuses.filter(api => api.status === 'no_api_key').length
        }
    });
}));
router.post('/check/:provider', auth_1.authenticate, (0, auth_1.authorize)('ADMIN', 'SUPER_ADMIN'), (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { provider } = req.params;
    logger_1.logger.info(`Checking specific provider: ${provider} by admin:`, req.user?.id);
    const allStatuses = await api_health_service_1.apiHealthService.checkAllAPIs();
    const providerStatus = allStatuses.find(api => api.provider.toLowerCase() === provider.toLowerCase());
    if (!providerStatus) {
        return res.status(404).json({
            success: false,
            error: 'Provider not found',
            availableProviders: allStatuses.map(api => api.provider)
        });
    }
    res.json({
        success: true,
        timestamp: new Date(),
        api: providerStatus
    });
}));
exports.default = router;
//# sourceMappingURL=api-health.routes.js.map