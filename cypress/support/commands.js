/*
* Those are the commands to using Puppeteer to open and login 
* via Single Sign On, on Azure DevOps. 
*/

// Cypress Command to do the Login on Azure DevOps Inside Cypress
Cypress.Commands.add('Microsoft_SSO', (urlMicrosoft, email, pass) => {
    const options = {
        username: email,
        password: pass,
        loginUrl: urlMicrosoft,
        headless: true,
    }

    // Task to Save the Cookies from Headless Chrome Using Puppeteer and Inject them on Cypress
    cy.task('AzureAdSSO', options).then(result => {
        cy.clearCookies()

        result.cookies.forEach(cookie => {

            // Set the Cookies 
            cy.setCookie(cookie.name, cookie.value, {
                domain: cookie.domain,
                expiry: cookie.expires,
                httpOnly: cookie.httpOnly,
                path: cookie.path,
                secure: cookie.secure
            })

            // Preserve the Cookies
            Cypress.Cookies.preserveOnce(cookie.name)
        })
    })

    cy.visit(urlMicrosoft)

})