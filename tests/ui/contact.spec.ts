import {test, expect} from '../../Fixtures/fixtures';
import { selectcampaignPage } from '../../pages';
import { contactTestData, defaultCampaignID } from '../../test-data/contactData';
import { makeContactDataUnique } from '../../utils/dataGenerator';

  // Basic test to verify the contact page header
  test('verify contacts page', async ({loginPage, navigationPage, contactPageFactory}) => {
    await loginPage.navigate(process.env.BASE_URL!);
    await loginPage.login(process.env.CRM_USERNAME!, process.env.CRM_PASSWORD!);
    await navigationPage.clickContactsLink();
    const header = await contactPageFactory.getContactPage().getContactPageHeader();
    expect(header).toBe('Contacts');
  });

  // Test to verify contact form visibility
  test('Verify create contact page', async ({loginPage, navigationPage, contactPageFactory}) => {
    await loginPage.navigate(process.env.BASE_URL!);
    await loginPage.login(process.env.CRM_USERNAME!, process.env.CRM_PASSWORD!);
    await navigationPage.clickContactsLink();
    await contactPageFactory.getContactPage().clickCreateContactButton();
    const createContactHeader = await contactPageFactory.getCreateContactPage().getCreateContactPage();
    expect(createContactHeader).toBe('Create Contact');
  });
    
  contactTestData.forEach((testData) => {
    test(`Verify valid Contact creation @current : ${testData.scenario}`, async ({ loginPage, navigationPage, contactPageFactory }) => {
      await loginPage.navigate(process.env.BASE_URL!);
      await loginPage.login(process.env.CRM_USERNAME!, process.env.CRM_PASSWORD!);
      
      await navigationPage.clickContactsLink();
      const contactPage = contactPageFactory.getContactPage();
      await contactPage.clickCreateContactButton();
      const createContactPage = contactPageFactory.getCreateContactPage();

      const uniqueData = makeContactDataUnique(testData)
      await createContactPage.fillContactForm(uniqueData);

      const childPage = await createContactPage.openSelectCampaignPage();
      await childPage.waitForLoadState('domcontentloaded');
      const  selectCampaignPage = new selectcampaignPage(childPage);
      await selectCampaignPage.selectCampaignFromTable(defaultCampaignID);;
      await createContactPage.submitForm();
      expect(await createContactPage.getContactCreatedMessage()).toBe(`Contact ${testData.contactName} Successfully Added`);
    });
      
  });
