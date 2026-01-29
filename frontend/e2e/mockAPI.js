import { loadEnv } from 'vite'

export async function mockBackend({ page, teams }) {
    // Optionally mock the api call before navigating
    await page.route(`http://${loadEnv("DEV", process.cwd()).VITE_WORKSHOP_USER}-testing-backend.workshop.devboost.com/tokens`, async route => {
        const json = { teams: teams ? teams : [] };
        await route.fulfill({ json });
    });
}
