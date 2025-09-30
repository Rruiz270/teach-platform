"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/posts', (req, res) => {
    res.json({ message: 'Get forum posts endpoint - To be implemented' });
});
exports.default = router;
//# sourceMappingURL=forum.routes.js.map