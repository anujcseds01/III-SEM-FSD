const http = require("http");

// ─────────────────────────────────────────────────────────
// 🎓  Student CRUD API  —  Node.js HTTP Server
// ─────────────────────────────────────────────────────────

// ── Console colours (no dependencies needed) ─────────────
const clr = {
    reset:   "\x1b[0m",
    bold:    "\x1b[1m",
    green:   "\x1b[32m",
    cyan:    "\x1b[36m",
    yellow:  "\x1b[33m",
    red:     "\x1b[31m",
    magenta: "\x1b[35m",
    dim:     "\x1b[2m",
};

// ── In-memory data store ─────────────────────────────────
let students = [
    { id: 1, name: "Anuj",   age: 21, course: "Full-Stack Development" },
    { id: 2, name: "Priya",  age: 22, course: "Data Science" },
    { id: 3, name: "Rahul",  age: 20, course: "Cloud Computing" },
];
let nextId = 4;

// ── Helpers ──────────────────────────────────────────────
const timestamp = () => new Date().toLocaleTimeString("en-IN", { hour12: false });

/** Send a JSON response with proper headers */
function sendJSON(res, statusCode, data) {
    res.writeHead(statusCode, {
        "Content-Type":                "application/json",
        "Access-Control-Allow-Origin": "*",
    });
    res.end(JSON.stringify(data, null, 2));
}

/** Collect the request body as a parsed JSON object */
function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = "";
        req.on("data", (chunk) => (body += chunk));
        req.on("end", () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch {
                reject(new Error("Invalid JSON in request body"));
            }
        });
    });
}

/** Pretty-print a request to the console */
function logRequest(method, url, statusCode) {
    const methodColors = {
        GET: clr.green, POST: clr.cyan, PUT: clr.yellow, DELETE: clr.red,
    };
    const c = methodColors[method] || clr.magenta;
    console.log(
        `  ${clr.dim}${timestamp()}${clr.reset}  ` +
        `${c}${clr.bold}${method.padEnd(7)}${clr.reset} ` +
        `${url}  →  ${statusCode < 400 ? clr.green : clr.red}${statusCode}${clr.reset}`
    );
}

// ── Route handler ────────────────────────────────────────
async function handleRequest(req, res) {
    const { method, url } = req;

    // ── Handle CORS preflight ────────────────────────────
    if (method === "OPTIONS") {
        res.writeHead(204, {
            "Access-Control-Allow-Origin":  "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        });
        return res.end();
    }

    // ── GET /student — List all students ─────────────────
    if (method === "GET" && url === "/student") {
        logRequest(method, url, 200);
        return sendJSON(res, 200, {
            success: true,
            count:   students.length,
            data:    students,
        });
    }

    // ── POST /student — Add a new student ────────────────
    if (method === "POST" && url === "/student") {
        try {
            const { name, age, course } = await parseBody(req);

            if (!name || !age || !course) {
                logRequest(method, url, 400);
                return sendJSON(res, 400, {
                    success: false,
                    message: "⚠️  Missing fields — name, age, and course are required",
                });
            }

            const newStudent = { id: nextId++, name, age, course };
            students.push(newStudent);

            logRequest(method, url, 201);
            return sendJSON(res, 201, {
                success: true,
                message: `✅ Student "${name}" added successfully`,
                data:    newStudent,
            });
        } catch (err) {
            logRequest(method, url, 400);
            return sendJSON(res, 400, { success: false, message: err.message });
        }
    }

    // ── PUT /student/:id — Update a student ──────────────
    if (method === "PUT" && url.startsWith("/student/")) {
        const id = parseInt(url.split("/")[2]);
        const index = students.findIndex((s) => s.id === id);

        if (index === -1) {
            logRequest(method, url, 404);
            return sendJSON(res, 404, {
                success: false,
                message: `❌ Student with id ${id} not found`,
            });
        }

        try {
            const updates = await parseBody(req);
            students[index] = { ...students[index], ...updates };

            logRequest(method, url, 200);
            return sendJSON(res, 200, {
                success: true,
                message: `✏️  Student ${id} updated`,
                data:    students[index],
            });
        } catch (err) {
            logRequest(method, url, 400);
            return sendJSON(res, 400, { success: false, message: err.message });
        }
    }

    // ── DELETE /student/:id — Remove a student ───────────
    if (method === "DELETE" && url.startsWith("/student/")) {
        const id = parseInt(url.split("/")[2]);
        const index = students.findIndex((s) => s.id === id);

        if (index === -1) {
            logRequest(method, url, 404);
            return sendJSON(res, 404, {
                success: false,
                message: `❌ Student with id ${id} not found`,
            });
        }

        const removed = students.splice(index, 1)[0];
        logRequest(method, url, 200);
        return sendJSON(res, 200, {
            success: true,
            message: `🗑️  Student "${removed.name}" deleted`,
            data:    removed,
        });
    }

    // ── 404 — Route not found ────────────────────────────
    logRequest(method, url, 404);
    return sendJSON(res, 404, {
        success: false,
        message: "🚫 Route not found",
        availableRoutes: {
            "GET    /student":      "List all students",
            "POST   /student":      "Add a student   { name, age, course }",
            "PUT    /student/:id":  "Update a student",
            "DELETE /student/:id":  "Delete a student",
        },
    });
}

// ── Start server ─────────────────────────────────────────
const PORT = 3000;

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
    console.log();
    console.log(`  ${clr.bold}${clr.magenta}🎓  Student CRUD API${clr.reset}`);
    console.log(`  ${clr.dim}${"─".repeat(40)}${clr.reset}`);
    console.log(`  ${clr.green}▸${clr.reset} Server running at ${clr.cyan}${clr.bold}http://localhost:${PORT}${clr.reset}`);
    console.log();
    console.log(`  ${clr.bold}Available routes:${clr.reset}`);
    console.log(`  ${clr.green}GET${clr.reset}     /student        List all students`);
    console.log(`  ${clr.cyan}POST${clr.reset}    /student        Add a student`);
    console.log(`  ${clr.yellow}PUT${clr.reset}     /student/:id   Update a student`);
    console.log(`  ${clr.red}DELETE${clr.reset}  /student/:id   Delete a student`);
    console.log(`  ${clr.dim}${"─".repeat(40)}${clr.reset}`);
    console.log();
});
