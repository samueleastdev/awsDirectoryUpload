import { __asyncGenerator, __await, __generator } from "tslib";
import { Buffer } from "buffer";
export function getDataReadableStream(data) {
    return __asyncGenerator(this, arguments, function getDataReadableStream_1() {
        var reader, _a, done, value, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    reader = data.getReader();
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 9, 10, 11]);
                    _b.label = 2;
                case 2:
                    if (!true) return [3 /*break*/, 8];
                    return [4 /*yield*/, __await(reader.read())];
                case 3:
                    _a = _b.sent(), done = _a.done, value = _a.value;
                    if (!done) return [3 /*break*/, 5];
                    return [4 /*yield*/, __await(void 0)];
                case 4: return [2 /*return*/, _b.sent()];
                case 5: return [4 /*yield*/, __await(Buffer.from(value))];
                case 6: 
                // Else yield the chunk.
                return [4 /*yield*/, _b.sent()];
                case 7:
                    // Else yield the chunk.
                    _b.sent();
                    return [3 /*break*/, 2];
                case 8: return [3 /*break*/, 11];
                case 9:
                    e_1 = _b.sent();
                    throw e_1;
                case 10:
                    // release the lock for reading from this stream.
                    reader.releaseLock();
                    return [7 /*endfinally*/];
                case 11: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0RGF0YVJlYWRhYmxlU3RyZWFtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NodW5rcy9nZXREYXRhUmVhZGFibGVTdHJlYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFFaEMsTUFBTSxVQUFpQixxQkFBcUIsQ0FBQyxJQUFvQjs7Ozs7O29CQUV6RCxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDOzs7Ozs7eUJBR3ZCLElBQUk7b0JBRWUsNkJBQU0sTUFBTSxDQUFDLElBQUksRUFBRSxHQUFBOztvQkFBckMsS0FBa0IsU0FBbUIsRUFBbkMsSUFBSSxVQUFBLEVBQUUsS0FBSyxXQUFBO3lCQUVmLElBQUksRUFBSix3QkFBSTs7d0JBQUUsaUNBQU87cURBRVgsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7O2dCQUR4Qix3QkFBd0I7Z0JBQ3hCLGdDQUF3Qjs7b0JBRHhCLHdCQUF3QjtvQkFDeEIsU0FBd0IsQ0FBQzs7Ozs7b0JBRzNCLE1BQU0sR0FBQyxDQUFDOztvQkFFUixpREFBaUQ7b0JBQ2pELE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7Ozs7O0NBRXhCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQnVmZmVyIH0gZnJvbSBcImJ1ZmZlclwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24qIGdldERhdGFSZWFkYWJsZVN0cmVhbShkYXRhOiBSZWFkYWJsZVN0cmVhbSk6IEFzeW5jR2VuZXJhdG9yPEJ1ZmZlcj4ge1xuICAvLyBHZXQgYSBsb2NrIG9uIHRoZSBzdHJlYW0uXG4gIGNvbnN0IHJlYWRlciA9IGRhdGEuZ2V0UmVhZGVyKCk7XG5cbiAgdHJ5IHtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgLy8gUmVhZCBmcm9tIHRoZSBzdHJlYW0uXG4gICAgICBjb25zdCB7IGRvbmUsIHZhbHVlIH0gPSBhd2FpdCByZWFkZXIucmVhZCgpO1xuICAgICAgLy8gRXhpdCBpZiB3ZSdyZSBkb25lLlxuICAgICAgaWYgKGRvbmUpIHJldHVybjtcbiAgICAgIC8vIEVsc2UgeWllbGQgdGhlIGNodW5rLlxuICAgICAgeWllbGQgQnVmZmVyLmZyb20odmFsdWUpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIHRocm93IGU7XG4gIH0gZmluYWxseSB7XG4gICAgLy8gcmVsZWFzZSB0aGUgbG9jayBmb3IgcmVhZGluZyBmcm9tIHRoaXMgc3RyZWFtLlxuICAgIHJlYWRlci5yZWxlYXNlTG9jaygpO1xuICB9XG59XG4iXX0=