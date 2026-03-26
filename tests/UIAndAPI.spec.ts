import { test, expect } from '../Fixtures/combinedFixtures';
import { testData } from '../pages/index'; 
import campaignConfig from '../test-data/campaignConfig.json';

test('Create Campaign UI + Validate in API', async ({
  navigationPage,
  campaignPage,
  campaignAPI,
  loggedIn
}) => {


  const campaignName = `Campaign${Math.random().toString(36).replace(/[^a-zA-Z]/g, '').substring(0,5)}`;

  await navigationPage.clickCampaign();

  // await campaignPage.createCampaignPage();
  // await campaignPage.formFill(testData.campaign,campaignName);
  // await campaignPage.clickSubmit();

  await campaignPage.createcampaign(campaignName, "22");
  console.log("From UI "+ campaignName);



  //  API VALIDATION 

  let createdCampaign;

  for (let i = 0; i < 5; i++) {

    const response = await campaignAPI.getCampaigns("1", "10");
    const body = await response.json();

    createdCampaign = body.content.find(
      (c: any) => c.campaignName === campaignName
    );

    if (createdCampaign) break;

    await new Promise(r => setTimeout(r, 2000));
  }
  console.log(createdCampaign);
  expect(createdCampaign).toBeDefined();
});