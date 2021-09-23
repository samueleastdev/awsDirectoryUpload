"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientDefaultValues = void 0;
const runtimeConfig_shared_1 = require("./runtimeConfig.shared");
const fs_1 = require("fs");
/**
 * @internal
 */
exports.ClientDefaultValues = {
    ...runtimeConfig_shared_1.ClientSharedValues,
    runtime: "node",
    lstatSync: fs_1.lstatSync,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVudGltZUNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ydW50aW1lQ29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlFQUE0RDtBQUM1RCwyQkFBK0I7QUFFL0I7O0dBRUc7QUFDVSxRQUFBLG1CQUFtQixHQUFHO0lBQ2pDLEdBQUcseUNBQWtCO0lBQ3JCLE9BQU8sRUFBRSxNQUFNO0lBQ2YsU0FBUyxFQUFULGNBQVM7Q0FDVixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2xpZW50U2hhcmVkVmFsdWVzIH0gZnJvbSBcIi4vcnVudGltZUNvbmZpZy5zaGFyZWRcIjtcbmltcG9ydCB7IGxzdGF0U3luYyB9IGZyb20gXCJmc1wiO1xuXG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgQ2xpZW50RGVmYXVsdFZhbHVlcyA9IHtcbiAgLi4uQ2xpZW50U2hhcmVkVmFsdWVzLFxuICBydW50aW1lOiBcIm5vZGVcIixcbiAgbHN0YXRTeW5jLFxufTtcbiJdfQ==