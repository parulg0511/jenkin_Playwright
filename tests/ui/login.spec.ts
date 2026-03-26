//import { test, expect } from '@playwright/test';
//import { baseTest} from '../tests/baseTest';
//import { loginPage } from '../pages/loginPage';
//import testData from '../test-data/testdata.json';
//import { test, expect } from '@playwright/test';
//import { baseTest, loginPage, leadsPage, navigationPage, selectcampaignPage, testData } from '../pages';
import { test, expect } from '../../Fixtures/fixtures';
import {  loginPage, leadsPage, navigationPage, selectcampaignPage, testData } from '../../pages'; //refers to index.ts barrel file

//let basetest: baseTest;
//let loginpage:loginPage;

test.describe('Login Tests', () => {

   /* test.beforeEach(async ({ page }) => {
         basetest = new baseTest();
        await basetest.setup(page);
    });*/

    test('Valid Login', async ({ loginPage }) => {
       // loginpage = new loginPage(page);
       // await loginpage.navigate('/');
       // await loginpage.login(testData.validUser.username,testData.validUser.password);
       await loginPage.navigate(process.env.BASE_URL!);
       await loginPage.login(process.env.CRM_USERNAME!,process.env.CRM_PASSWORD!);
        await loginPage.expectUrl('dashboard');
        await loginPage.expectHeadingVisible('Campaigns');
    });



    testData.invalidUsers.forEach(({ username, password, expected }) => {
        test(`Login test with ${username || 'empty'} credentials`, async ({ loginPage }) => {
          //  loginpage = new loginPage(page);
          //  await loginpage.navigate('/');
           await loginPage.navigate(process.env.BASE_URL!);
            await loginPage.login(username,password);
            //await loginPage.login(process.env.USERNAME!,process.env.PASSWORD!);
            await loginPage.expectNotUrl('dashboard');
      });
    });

   /* test('Tear Down', async ({}, testInfo) => {
    
        await basetest.teardown(testInfo);
    });*/
});
