const {Builder, By, Key, until} = require('selenium-webdriver');
const asyncHandler = require("express-async-handler");

const {
    maximaDiscounts,
} = require("../services/maximaServices");

const cleanElementArray = asyncHandler(async (array, atribute, replaceWith = "") => {

    let returnArray = [];

        for(let e of array) {
            let elem = await e.getAttribute(atribute);
            elem = elem.replace(/€+/g, '').trim();

            if(elem != '') returnArray.push(elem.replace(/(\r\n|\n|\r)\s+/g, replaceWith));
            
            else returnArray.push('');
        }

    return returnArray;
});

const getMaximaDiscounts = asyncHandler(async (req, res) => {

    const driver = await new Builder().forBrowser('chrome').build();

    await driver.get('https://www.maxima.lt/akcijos');

    const titles = await driver.findElements(By.className('mt-4 text-truncate'));
    const prices = await driver.findElements(By.className('price-wrapper'));
    const dateTo = await driver.findElements(By.className('offer-dateTo-wrapper'));
    const percents = await driver.findElements(By.className('discount-icon'));
    const images = await driver.findElements(By.className('offer-image'));
    
    let titlesArray = await cleanElementArray(titles, 'textContent');
    let pricesArray = await cleanElementArray(prices, 'textContent', ',');
    let dateArray = await cleanElementArray(dateTo, 'textContent');
    let percentArray = await cleanElementArray(percents, 'textContent');

    let responseArray = [];

    for (let i = 0; i < titlesArray.length; i++) {
        const title = titlesArray[i];
        const price = pricesArray[i];
        const date = dateArray[i];
        const percent = percentArray[i];

        responseArray.push({
            product: title,
            price: price,
            dateTo: date,
            percent: percent,
        });
    }

    res.json(responseArray);
});

module.exports = {
    getMaximaDiscounts,
}