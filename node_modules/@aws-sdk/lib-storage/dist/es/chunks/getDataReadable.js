import { __asyncGenerator, __asyncValues, __await, __generator } from "tslib";
import { Buffer } from "buffer";
export function getDataReadable(data) {
    return __asyncGenerator(this, arguments, function getDataReadable_1() {
        var data_1, data_1_1, chunk, e_1_1;
        var e_1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 7, 8, 13]);
                    data_1 = __asyncValues(data);
                    _b.label = 1;
                case 1: return [4 /*yield*/, __await(data_1.next())];
                case 2:
                    if (!(data_1_1 = _b.sent(), !data_1_1.done)) return [3 /*break*/, 6];
                    chunk = data_1_1.value;
                    return [4 /*yield*/, __await(Buffer.from(chunk))];
                case 3: return [4 /*yield*/, _b.sent()];
                case 4:
                    _b.sent();
                    _b.label = 5;
                case 5: return [3 /*break*/, 1];
                case 6: return [3 /*break*/, 13];
                case 7:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 13];
                case 8:
                    _b.trys.push([8, , 11, 12]);
                    if (!(data_1_1 && !data_1_1.done && (_a = data_1.return))) return [3 /*break*/, 10];
                    return [4 /*yield*/, __await(_a.call(data_1))];
                case 9:
                    _b.sent();
                    _b.label = 10;
                case 10: return [3 /*break*/, 12];
                case 11:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 12: return [7 /*endfinally*/];
                case 13: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0RGF0YVJlYWRhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NodW5rcy9nZXREYXRhUmVhZGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFFaEMsTUFBTSxVQUFpQixlQUFlLENBQUMsSUFBYzs7Ozs7Ozs7b0JBQ3pCLFNBQUEsY0FBQSxJQUFJLENBQUE7Ozs7O29CQUFiLEtBQUssaUJBQUEsQ0FBQTtpREFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzt3QkFBeEIsZ0NBQXdCOztvQkFBeEIsU0FBd0IsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBRTVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVhZGFibGUgfSBmcm9tIFwic3RyZWFtXCI7XG5pbXBvcnQgeyBCdWZmZXIgfSBmcm9tIFwiYnVmZmVyXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiogZ2V0RGF0YVJlYWRhYmxlKGRhdGE6IFJlYWRhYmxlKTogQXN5bmNHZW5lcmF0b3I8QnVmZmVyPiB7XG4gIGZvciBhd2FpdCAoY29uc3QgY2h1bmsgb2YgZGF0YSkge1xuICAgIHlpZWxkIEJ1ZmZlci5mcm9tKGNodW5rKTtcbiAgfVxufVxuIl19