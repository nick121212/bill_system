import * as _ from "lodash";
export class BaseEntity {
    extend(partial) {
        Object.assign(this, _.defaults(partial, this));
        return this;
    }
}
//# sourceMappingURL=Base.js.map