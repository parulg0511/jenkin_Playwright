import { test as base, TestInfo } from '@playwright/test';
//import { loginPage } from '../pages/loginPage';
//import { leadsPage } from '../pages/leadsPage';
//import { navigationPage } from '../pages/navigationPage';
//import { selectcampaignPage } from '../pages/selectCampaignPage';
//import { campaignPage } from '../pages/campaignPage';
import testData from '../test-data/testdata.json';
import campaignConfig from '../test-data/campaignConfig.json';
import { loginPage, leadsPage, navigationPage,selectcampaignPage, campaignPage, ContactPageFactory} from '../pages/index'; 

type MyFixtures = {
  loginPage: loginPage;
  leadsPage: leadsPage;
  navigationPage: navigationPage;
  campaignPage: campaignPage;
  selectcampaignPage: selectcampaignPage;
  loggedIn: void; 
  screenshotOnFailure: void;
  testData: typeof testData;
  campaignConfig: typeof campaignConfig;
  contactPageFactory: ContactPageFactory;
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => { //data fixture
        await use(new loginPage(page));
      },
    
      leadsPage: async ({ page }, use) => {
        await use(new leadsPage(page));
      },
      selectcampaignPage: async ({ page }, use) => {
        await use(new selectcampaignPage(page));
      },
      navigationPage: async ({ page }, use) => {
        await use(new navigationPage(page));
      },
  
      campaignPage: async ({ page }, use) => {
        await use(new campaignPage(page));
      },
      testData: async ({}, use) => {
        await use(testData);
      },
      campaignConfig: async ({}, use) => {
        await use(campaignConfig);
      },

      contactPageFactory: async ({ page }, use) => {
        await use(new ContactPageFactory(page));
      },

      loggedIn: async ({ page }, use) => { //Behavior Fixture

        const login = new loginPage(page);
        
      
       /* await login.navigate('/');
        await login.login(
          testData.validUser.username,
          testData.validUser.password*/

            // Use URL, Username, Password from .env
        await login.navigate(process.env.BASE_URL!);
        await login.login(process.env.CRM_USERNAME!,process.env.CRM_PASSWORD!);
        
      
        await use(); // test executes after login
      
      },

      screenshotOnFailure: async ({ page }, use, testInfo: TestInfo) => {

        await use(); 
      
        // This code runs AFTER test finishes
      
        if (testInfo.status !== testInfo.expectedStatus) {
      
          const screenshot = await page.screenshot({
            fullPage: true
          });
      
          await testInfo.attach('Failure Screenshot', {
            body: screenshot,
            contentType: 'image/png'
          });
      
        }
      
      },
      
    });
    export { expect } from '@playwright/test';
