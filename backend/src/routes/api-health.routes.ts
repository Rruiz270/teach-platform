import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';
import { apiHealthService } from '../services/api-health.service';
import { logger } from '../utils/logger';

const router = Router();

/**
 * Get API health status for all providers
 * Available to authenticated users (shows user-relevant status)
 */
router.get(
  '/status',
  authenticate,
  asyncHandler(async (req, res) => {
    logger.info('API health status requested by user:', req.user?.id);
    
    const apiStatuses = await apiHealthService.checkAllAPIs();
    
    // Return user-friendly status
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
  })
);

/**
 * Get detailed API health status (admin only)
 */
router.get(
  '/detailed',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  asyncHandler(async (req, res) => {
    logger.info('Detailed API health status requested by admin:', req.user?.id);
    
    const apiStatuses = await apiHealthService.checkAllAPIs();
    
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
  })
);

/**
 * Check specific API provider (admin only)
 */
router.post(
  '/check/:provider',
  authenticate,
  authorize('ADMIN', 'SUPER_ADMIN'),
  asyncHandler(async (req, res) => {
    const { provider } = req.params;
    logger.info(`Checking specific provider: ${provider} by admin:`, req.user?.id);
    
    // For now, check all and filter (could be optimized later)
    const allStatuses = await apiHealthService.checkAllAPIs();
    const providerStatus = allStatuses.find(api => 
      api.provider.toLowerCase() === provider.toLowerCase()
    );
    
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
  })
);

export default router;