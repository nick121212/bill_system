"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEntity = void 0;
const _ = require("lodash");
class BaseEntity {
    extend(partial) {
        Object.assign(this, _.defaults(partial, this));
        return this;
    }
    constructor(partial) {
    }
}
exports.BaseEntity = BaseEntity;
//# sourceMappingURL=Base.js.map