# cypress-microsoft-SSO👨‍💻
As a Test Automation Engineer working with Cypress.io I've been strugling to find some solutions for my problems. 
This was, until now, my biggest challenge to find a way to pass the Single Sign On on Microsoft inside Cypress and the proceed to the page.

## Usage
`cypress-microsoft-SSO` extends Cypress' `cy` command.

To visit and enter inside a page who requires the Microsoft Single Sign On:
```javascript
cy.microsoftSSO('https://login.microsoftonline.com/', 'YOUR_EMAIL_ACCOUNT_HERE', 'YOUR_PASSWORD_HERE')
```
So, first you should introduce the url who requires the Microsoft SSO, then your email and password.
Quick example:
```javascript
describe('Open Microsoft using SSO', () => {
    it('SSO on Microsoft', () => {
        cy.Microsoft_SSO('https://login.microsoftonline.com/', 'YOUR_EMAIL_ACCOUNT_HERE', 'YOUR_PASSWORD_HERE')
    })
})
```
