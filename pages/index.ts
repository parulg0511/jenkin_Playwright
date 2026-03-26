export { test, expect } from '@playwright/test';

export { loginPage } from '../pages/loginPage';

export { leadsPage } from '../pages/leadsPage';
export{navigationPage} from '../pages/navigationPage';
export{selectcampaignPage} from '../pages/selectCampaignPage';
export{campaignPage} from '../pages/campaignPage';
export { default as testData } from '../test-data/testdata.json';
export { default as campaignConfig } from '../test-data/campaignConfig.json';

export { UserAPI } from '../api/UserApi';
export { CampaignAPI } from '../api/CampaignAPI';

export { InvoiceAPI } from '../api/InvoiceAPI';

export { getAPIContext } from '../utils/apiClient';


export { ContactPage } from './contact/ContactPage';
export { CreateContactPage } from './contact/CreateContactPage';

export { ContactPageFactory } from '../pageFactory/ContactPageFactory';
export { ContactApi } from '../api/ContactApi';
