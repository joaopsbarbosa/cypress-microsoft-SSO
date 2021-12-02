const puppeteer = require('puppeteer')

/**
 *
 * @param {options.username} string username
 * @param {options.password} string password
 * @param {options.loginUrl} string The Url of the application
 * @param {options.postLoginSelector} string a selector on the app's post-login return page to assert that login is successful
 * @param {options.headless} boolean launch puppeteer in headless more or not
 * @param {options.logs} boolean whether to log cookies and other metadata to console
 * @param {options.getAllBrowserCookies} boolean whether to get all browser cookies instead of just for the loginUrl
 */
module.exports.AzureAdSingleSignOn = async function AzureAdSingleSignOn(options = {}) {
    validateOptions(options)

    const browser = await puppeteer.launch({ headless: !!options.headless, args: ['--proxy-server=proxy.inet.exch.int:8080'] }) //This line in order to run Cypress in headless mode, if you want to change the mode to false, you can do so in the my.spec.js file in the options
    const page = await browser.newPage()
    await page.goto(options.loginUrl)

    await typeUsername({ page, options })
    await typePassword({ page, options })

    const cookies = await getCookies({ page, options })

    await finalizeSession({ page, browser, options })

    return {
        cookies
    }
}

//This function validate if the information are passed by the enviroment, if they pop up it means there is a problem with the enviroment file
function validateOptions(options) {
    if (!options.username || !options.password) {
        throw new Error('Username or Password missing for login')
    }
    if (!options.loginUrl) {
        throw new Error('Login Url missing')
    }
}

//Function for typing the username in the Microsoft logging page
async function typeUsername({ page, options } = {}) {
    await page.waitForSelector('input[name=loginfmt]:not(.moveOffScreen)', { visible: true, delay: 10000 })
    await page.type('input[name=loginfmt]', options.username, { delay: 50 })
    await page.click('input[type=submit]')
}

//Funtion for typing the password in the Microsoft loggin page
async function typePassword({ page, options } = {}) {
    await page.waitForSelector('input[name=Password]:not(.moveOffScreen),input[name=passwd]:not(.moveOffScreen)', { visible: true, delay: 10000 })
    await page.type('input[name=passwd]', options.password, { delay: 50 })
    await page.click('input[type=submit]')
    //The reason for the next four lines of codes is to get rid of all the pop ups that Microsoft might show after the logging in like the (Do you want to stay signed in) one
    await page.waitFor(3000);
    await page.keyboard.press('Enter');
    await page.keyboard.press('Enter');
    await page.keyboard.press('Enter');
}

//Function for getting the cookies after the logging in
async function getCookies({ page, options } = {}) {

    await page.waitFor(30000)

    //Setting the cookies constant to false might make the test unstable beacuse cookies might not pass, while making it true makes it run smoothly 
    const cookies = true
        ? await getCookiesForAllDomains(page)
        : await page.cookies(options.loginUrl)

    if (options.logs) {
        console.log(cookies)
    }

    return cookies
}
//This will get the cookies for all the websites connected
async function getCookiesForAllDomains(page) {
    const cookies = await page._client.send('Network.getAllCookies', {})
    return cookies.cookies
}

async function finalizeSession({ page, browser, options } = {}) {
    await browser.close()
}