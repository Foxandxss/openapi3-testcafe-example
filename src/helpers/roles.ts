import { Role } from 'testcafe';
require('dotenv').config();

const login = (username: string, password: string) => {
  return Role(process.env.SITE_URL, async t => {
    await t
    .typeText('#user', username)
    .typeText('#password', password)
    .click('#login');
  }, { preserveUrl: true});  
}

export const readonlyUser = login(process.env.READONLY_USERNAME, process.env.READONLY_PASSWORD);
export const placesAdmin = login(process.env.PLACESONLY_USERNAME, process.env.PLACESONLY_PASSWORD);