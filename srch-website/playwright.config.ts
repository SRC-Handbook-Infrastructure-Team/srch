import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: 'src/tests',
    use: {
        baseURL: 'http://localhost:5173',
        headless: true,
    },
    webServer: {
        command: 'npm run dev',
        port: 5173,
        reuseExistingServer: !process.env.CI,
    },
});