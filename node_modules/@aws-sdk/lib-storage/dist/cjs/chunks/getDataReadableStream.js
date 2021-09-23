"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataReadableStream = void 0;
const buffer_1 = require("buffer");
async function* getDataReadableStream(data) {
    // Get a lock on the stream.
    const reader = data.getReader();
    try {
        while (true) {
            // Read from the stream.
            const { done, value } = await reader.read();
            // Exit if we're done.
            if (done)
                return;
            // Else yield the chunk.
            yield buffer_1.Buffer.from(value);
        }
    }
    catch (e) {
        throw e;
    }
    finally {
        // release the lock for reading from this stream.
        reader.releaseLock();
    }
}
exports.getDataReadableStream = getDataReadableStream;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0RGF0YVJlYWRhYmxlU3RyZWFtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NodW5rcy9nZXREYXRhUmVhZGFibGVTdHJlYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQWdDO0FBRXpCLEtBQUssU0FBUyxDQUFDLENBQUMscUJBQXFCLENBQUMsSUFBb0I7SUFDL0QsNEJBQTRCO0lBQzVCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUVoQyxJQUFJO1FBQ0YsT0FBTyxJQUFJLEVBQUU7WUFDWCx3QkFBd0I7WUFDeEIsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUM1QyxzQkFBc0I7WUFDdEIsSUFBSSxJQUFJO2dCQUFFLE9BQU87WUFDakIsd0JBQXdCO1lBQ3hCLE1BQU0sZUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMxQjtLQUNGO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixNQUFNLENBQUMsQ0FBQztLQUNUO1lBQVM7UUFDUixpREFBaUQ7UUFDakQsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3RCO0FBQ0gsQ0FBQztBQW5CRCxzREFtQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCdWZmZXIgfSBmcm9tIFwiYnVmZmVyXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiogZ2V0RGF0YVJlYWRhYmxlU3RyZWFtKGRhdGE6IFJlYWRhYmxlU3RyZWFtKTogQXN5bmNHZW5lcmF0b3I8QnVmZmVyPiB7XG4gIC8vIEdldCBhIGxvY2sgb24gdGhlIHN0cmVhbS5cbiAgY29uc3QgcmVhZGVyID0gZGF0YS5nZXRSZWFkZXIoKTtcblxuICB0cnkge1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAvLyBSZWFkIGZyb20gdGhlIHN0cmVhbS5cbiAgICAgIGNvbnN0IHsgZG9uZSwgdmFsdWUgfSA9IGF3YWl0IHJlYWRlci5yZWFkKCk7XG4gICAgICAvLyBFeGl0IGlmIHdlJ3JlIGRvbmUuXG4gICAgICBpZiAoZG9uZSkgcmV0dXJuO1xuICAgICAgLy8gRWxzZSB5aWVsZCB0aGUgY2h1bmsuXG4gICAgICB5aWVsZCBCdWZmZXIuZnJvbSh2YWx1ZSk7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgdGhyb3cgZTtcbiAgfSBmaW5hbGx5IHtcbiAgICAvLyByZWxlYXNlIHRoZSBsb2NrIGZvciByZWFkaW5nIGZyb20gdGhpcyBzdHJlYW0uXG4gICAgcmVhZGVyLnJlbGVhc2VMb2NrKCk7XG4gIH1cbn1cbiJdfQ==