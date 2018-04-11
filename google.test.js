const test = require('ava')
const puppeteer = require('puppeteer')
const { Observable } = require('rxjs')

test('Google search', t => {
  return Observable.defer(async () => {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()

    await page.goto('https://www.google.com')
    await page.waitFor('input[type="text"]')
    await page.type('input[type="text"]', 'Bitcoin')
    await page.keyboard.press('Enter')
    await page.waitForNavigation()

    // First element of input text should be searc text bar
    const searchTitle = await page.$eval('input[type="text"]', elem => elem.getAttribute('value'))
    t.deepEqual(searchTitle, 'Bitcoin')
  })
})
