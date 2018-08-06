const test = require('ava')
const puppeteer = require('puppeteer')
const { Observable } = require('rxjs')

test('Search lazada item category', t => {
  return Observable.defer(async () => {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()

    await page.goto('https://www.lazada.sg/')
    await page.waitFor('input[type=search]')
    await page.type('input[type=search]', 'glove')
    await page.keyboard.press('Enter')
    await page.waitForNavigation()

    const items = await page.evaluate(
      () => [...document.querySelectorAll('div[data-item-id]')]
        .map(elem => elem.textContent)
    )

    const  items.map(item => item.split('SGD'))

    return Observable
      .of({})
      .mergeMap(res => Observable.from(res))
  })
})
