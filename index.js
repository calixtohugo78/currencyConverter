const puppeteer = require('puppeteer');
const readlineSync = require('readline-sync');

console.clear();
console.log("\n-----------Currency Converter in NodeJs-----------\n");

async function currencyConverter() {

    const browser = await puppeteer.launch({ headless: true }); //init new browser window
    const page = await browser.newPage(); //open a new page in browser window

    const baseMoney = readlineSync.question("Inform the base currency: ") || 'dolar';
    const finalMoney = readlineSync.question("Inform the desired currency: ") || 'real';
    const baseMoneyAmount = readlineSync.question("Base currency amount: ") || 1;

    const moneyURL = `https://www.google.com/search?q=${baseMoney}+para+${finalMoney}&oq=${baseMoney}+para+${finalMoney}&aqs=chrome.0.0i131i433i512l3j0i512l6j0i433i512.2248j1j7&sourceid=chrome&ie=UTF-8`;

    await page.goto(moneyURL);

    const result = await page.evaluate(() => {
        return document.querySelector('.a61j6.vk_gy.vk_sh.Hg3mWc').value
    })

    console.log(`\nBase money: ${baseMoney}\nFinal money: ${finalMoney}\n_____________\n`);
    console.log(`The value of ${baseMoneyAmount} ${baseMoney} in ${finalMoney} is ${result * baseMoneyAmount}`);

    await browser.close();

}

currencyConverter();