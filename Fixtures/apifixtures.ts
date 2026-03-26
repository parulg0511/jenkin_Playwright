import { test as base } from '@playwright/test';
//import { getAPIContext } from '../utils/apiClient';
//import { UserAPI } from '../api/UserApi';
//import { CampaignAPI } from '../api/CampaignAPI';
import { getAPIContext, UserAPI, CampaignAPI,InvoiceAPI, ContactApi } from '../pages/index'; 

type MyFixtures = {
  apiContext: any;
  token: string;
  userAPI: UserAPI;
  campaignAPI: CampaignAPI;
  invoiceAPI:InvoiceAPI;
  loginResponse: any;
  contactApi: ContactApi;
};

export const test = base.extend<MyFixtures>({
  
  // API Context Fixture
  apiContext: async ({}, use) => {
    const apiContext = await getAPIContext();
    await use(apiContext);
  },

  // Token Fixture (auto login)
  token: async ({ apiContext }, use) => {
    const authAPI = new UserAPI(apiContext);
    const result = await authAPI.login();
    const token = result.token;
    await use(token);
  },

  // User API Fixture
  userAPI: async ({ apiContext }, use) => {
    await use(new UserAPI(apiContext));
  },

  // Campaign API Fixture
  campaignAPI: async ({ apiContext }, use) => {
    await use(new CampaignAPI(apiContext));
  },
 // Invoice API Fixture
 invoiceAPI: async ({ apiContext }, use) => {
  await use(new InvoiceAPI(apiContext));
},

  loginResponse: async ({ apiContext }, use) => {
    const authAPI = new UserAPI(apiContext);
    const result = await authAPI.login();
    await use(result);
  },

  contactApi: async ({}, use) => {
    const apiContext = await getAPIContext();
    await use(new ContactApi(apiContext));
  }

});

export { expect } from '@playwright/test';
