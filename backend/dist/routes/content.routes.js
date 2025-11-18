"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const content_controller_1 = require("../controllers/content.controller");
const router = (0, express_1.Router)();
router.post('/bulk-create', auth_1.auth, content_controller_1.contentController.bulkCreate);
router.get('/level/:level/topic/:topic', auth_1.auth, content_controller_1.contentController.getByLevelAndTopic);
router.patch('/:id/status', auth_1.auth, content_controller_1.contentController.updateStatus);
exports.default = router;
//# sourceMappingURL=content.routes.js.map