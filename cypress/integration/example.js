/*
* This is an example using a simple command to login using
* Single Sign On, on Microsoft via Cypress.
*/

describe('Open Microsoft using SSO', () => {

    it('SSO on Microsoft', () => {
        cy.Microsoft_SSO('https://login.microsoftonline.com/', 'YOUR_EMAIL_ACCOUNT_HERE', 'YOUR_PASSWORD_HERE')
  
    })

})