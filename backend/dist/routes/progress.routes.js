"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get('/', auth_1.authenticate, (req, res) => {
    res.json({ message: 'Get progress endpoint - To be implemented' });
});
exports.default = router;
//# sourceMappingURL=progress.routes.js.map