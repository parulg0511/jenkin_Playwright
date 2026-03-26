import { Page, Locator } from '@playwright/test';
import { basePage } from '../basePage';

export class ContactPage extends basePage{

   private readonly contactHeader: Locator;

   constructor (page: Page) {
      super(page);
      this.contactHeader = page.locator('h2');
   }
   async clickCreateContactButton() {
      await this.page.getByRole('button', { name: 'Create Contact' }).click();
   }
   
   async getContactPageHeader() {
      return await this.contactHeader.textContent();
   }
}