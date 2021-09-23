"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.byteLength = void 0;
const runtimeConfig_1 = require("./runtimeConfig");
const byteLength = (input) => {
    if (input === null || input === undefined)
        return 0;
    if (typeof input === "string")
        input = Buffer.from(input);
    if (typeof input.byteLength === "number") {
        return input.byteLength;
    }
    else if (typeof input.length === "number") {
        return input.length;
    }
    else if (typeof input.size === "number") {
        return input.size;
    }
    else if (typeof input.path === "string") {
        try {
            return runtimeConfig_1.ClientDefaultValues.lstatSync(input.path).size;
        }
        catch (error) {
            return undefined;
        }
    }
    return undefined;
};
exports.byteLength = byteLength;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnl0ZWxlbmd0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ieXRlbGVuZ3RoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1EQUFzRDtBQUUvQyxNQUFNLFVBQVUsR0FBRyxDQUFDLEtBQVUsRUFBRSxFQUFFO0lBQ3ZDLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssU0FBUztRQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3BELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUTtRQUFFLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFELElBQUksT0FBTyxLQUFLLENBQUMsVUFBVSxLQUFLLFFBQVEsRUFBRTtRQUN4QyxPQUFPLEtBQUssQ0FBQyxVQUFVLENBQUM7S0FDekI7U0FBTSxJQUFJLE9BQU8sS0FBSyxDQUFDLE1BQU0sS0FBSyxRQUFRLEVBQUU7UUFDM0MsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDO0tBQ3JCO1NBQU0sSUFBSSxPQUFPLEtBQUssQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO1FBQ3pDLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQztLQUNuQjtTQUFNLElBQUksT0FBTyxLQUFLLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtRQUN6QyxJQUFJO1lBQ0YsT0FBTyxtQ0FBbUIsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQztTQUN2RDtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsT0FBTyxTQUFTLENBQUM7U0FDbEI7S0FDRjtJQUNELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUMsQ0FBQztBQWpCVyxRQUFBLFVBQVUsY0FpQnJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2xpZW50RGVmYXVsdFZhbHVlcyB9IGZyb20gXCIuL3J1bnRpbWVDb25maWdcIjtcblxuZXhwb3J0IGNvbnN0IGJ5dGVMZW5ndGggPSAoaW5wdXQ6IGFueSkgPT4ge1xuICBpZiAoaW5wdXQgPT09IG51bGwgfHwgaW5wdXQgPT09IHVuZGVmaW5lZCkgcmV0dXJuIDA7XG4gIGlmICh0eXBlb2YgaW5wdXQgPT09IFwic3RyaW5nXCIpIGlucHV0ID0gQnVmZmVyLmZyb20oaW5wdXQpO1xuICBpZiAodHlwZW9mIGlucHV0LmJ5dGVMZW5ndGggPT09IFwibnVtYmVyXCIpIHtcbiAgICByZXR1cm4gaW5wdXQuYnl0ZUxlbmd0aDtcbiAgfSBlbHNlIGlmICh0eXBlb2YgaW5wdXQubGVuZ3RoID09PSBcIm51bWJlclwiKSB7XG4gICAgcmV0dXJuIGlucHV0Lmxlbmd0aDtcbiAgfSBlbHNlIGlmICh0eXBlb2YgaW5wdXQuc2l6ZSA9PT0gXCJudW1iZXJcIikge1xuICAgIHJldHVybiBpbnB1dC5zaXplO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBpbnB1dC5wYXRoID09PSBcInN0cmluZ1wiKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBDbGllbnREZWZhdWx0VmFsdWVzLmxzdGF0U3luYyhpbnB1dC5wYXRoKS5zaXplO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufTtcbiJdfQ==