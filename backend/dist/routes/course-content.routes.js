"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const course_content_controller_1 = require("../controllers/course-content.controller");
const router = (0, express_1.Router)();
router.post('/create', auth_1.auth, course_content_controller_1.courseContentController.create);
router.get('/level/:level', auth_1.auth, course_content_controller_1.courseContentController.getByLevel);
router.get('/stats', auth_1.auth, course_content_controller_1.courseContentController.getStats);
exports.default = router;
//# sourceMappingURL=course-content.routes.js.map