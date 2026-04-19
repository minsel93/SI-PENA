# Deployment Guide for SI-PENA

## 1. Google Apps Script (GAS) Configuration
To configure SI-PENA with Google Apps Script:

### Option A: Use the Pre-built GAS Version
The files in the `/gas` directory are specifically designed for GAS.
1. Create a new Google Apps Script project.
2. Copy the content of `/gas/Code.gs` into your `Code.gs`.
3. Create HTML files in the GAS editor matching the names in the `/gas` folder (e.g., `Index.html`, `Sidebar.html`, `Script.html`, `Style.html`).
4. Ensure the `SPREADSHEET_ID` in `Code.gs` matches your target spreadsheet.

### Option B: Build from React Source
1. Run `npm run build`.
2. Because `vite-plugin-singlefile` is enabled, Vite will generate a single `dist/index.html`.
3. Copy the content of `dist/index.html` into an `Index.html` file in your GAS project.
4. Note: React version uses `gasService.ts` which automatically detects the GAS environment.

## 2. Vercel Configuration
To configure SI-PENA with Vercel:

1. Push this project to GitHub.
2. Import the project into Vercel.
3. Vercel will automatically detect the Vite project.
4. **Environment Variables**: Add your Spreadsheet API keys or Firebase config if you decide to move away from pure GAS.
5. The project is configured with a full-stack Express server (`server.ts`) which Vercel will run as a Serverless function if configured (though standard static deployment is usually enough for Vite SPAs).

### Technical Note: Full-Stack Mode
The app now runs an Express server in the root. This allows you to add server-side logic in `server.ts` for the Vercel version, while the frontend remains compatible with GAS.
