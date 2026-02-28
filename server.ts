import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock GAS Server-side functions
  app.post("/api/gas", async (req, res) => {
    const { functionName, args } = req.body;
    console.log(`GAS Call: ${functionName}`, args);

    try {
      if (functionName === "getPartial") {
        const filename = args[0];
        const filePath = path.join(__dirname, "gas", `${filename}.html`);
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, "utf8");
          return res.json({ success: true, data: content });
        } else {
          return res.status(404).json({ success: false, error: `File ${filename}.html not found` });
        }
      }

      if (functionName === "login") {
        const [username, password] = args;
        // Simple mock login
        if (username === "admin" && password === "admin") {
          return res.json({
            success: true,
            data: {
              success: true,
              user: {
                username: "admin",
                role: "ADMIN",
                puskesmasId: "P001",
                puskesmasName: "Puskesmas Pusat"
              }
            }
          });
        }
        return res.json({ success: true, data: { success: false, message: "Username atau Password salah!" } });
      }

      if (functionName === "submitDataToServer") {
        const [sheetName, data] = args;
        console.log(`Submitting to ${sheetName}:`, data);
        return res.json({ success: true, data: { success: true } });
      }

      if (functionName === "getRecordsFromServer") {
        const [sheetName] = args;
        return res.json({ success: true, data: [] });
      }

      return res.status(400).json({ success: false, error: `Function ${functionName} not implemented` });
    } catch (error: any) {
      return res.status(500).json({ success: false, error: error.message });
    }
  });

  // Serve Index.html with includes processed
  app.get("/", (req, res) => {
    const indexPath = path.join(__dirname, "gas", "Index.html");
    if (!fs.existsSync(indexPath)) {
      return res.status(404).send("Index.html not found in gas directory");
    }

    let content = fs.readFileSync(indexPath, "utf8");

    // Simple regex to handle <?!= include('Filename'); ?>
    const includeRegex = /<\?!= include\('(.+?)'\); \?>/g;
    content = content.replace(includeRegex, (match, filename) => {
      const filePath = path.join(__dirname, "gas", `${filename}.html`);
      if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath, "utf8");
      }
      return `<!-- Error: ${filename}.html not found -->`;
    });

    res.send(content);
  });

  // Vite middleware for development
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
