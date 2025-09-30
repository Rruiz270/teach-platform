"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.json({ message: 'Get modules endpoint - To be implemented' });
});
router.get('/:id', (req, res) => {
    res.json({ message: 'Get module by id endpoint - To be implemented' });
});
exports.default = router;
//# sourceMappingURL=module.routes.js.map