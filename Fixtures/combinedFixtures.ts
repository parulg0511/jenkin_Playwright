import { test as base } from '@playwright/test';


// UI
import { loginPage, navigationPage, campaignPage,testData } from '../pages/index';

// API
import { getAPIContext, CampaignAPI } from '../pages/index';

type MyFixtures = {
  navigationPage: navigationPage;
  campaignPage: campaignPage;
  loggedIn: void;
  campaignAPI: CampaignAPI;
};

export const test = base.extend<MyFixtures>({

  // UI Fixtures
  navigationPage: async ({ page }, use) => {
    await use(new navigationPage(page));
  },

  campaignPage: async ({ page }, use) => {
    await use(new campaignPage(page));
  },

  loggedIn: async ({ page }, use) => {
    const login = new loginPage(page);

    await login.navigate(process.env.BASE_URL!);
    await login.login(
      process.env.CRM_USERNAME!,
      process.env.CRM_PASSWORD!
    );

    await use();
  },

  // API Fixture
  campaignAPI: async ({ request }, use) => {
    await use(new CampaignAPI(request));
  },

});

export { expect } from '@playwright/test';