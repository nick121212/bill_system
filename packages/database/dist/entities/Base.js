"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEntity = void 0;
class BaseEntity {
    extend(partial) {
        Object.assign(this, partial);
        return this;
    }
    constructor(partial) {
    }
}
exports.BaseEntity = BaseEntity;
//# sourceMappingURL=Base.js.map