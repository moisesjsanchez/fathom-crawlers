const puppeteer = require('puppeteer');

(async() => {
    const browser = await puppeteer.launch({
        headless:true,
        args: ['--no-sandbox','--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    await page.goto('https://fathomevents.com/categories/anime', { waitUntil: 'networkidle2'});

    let data = await page.evaluate(() => {

        let title = document.querySelectorAll('.card__title.card__title--event').innerText;
        let date = document.querySelectorAll('.date.card__date').innerText;
        let img = document.querySelectorAll('.card__event-poster.lazy').innerText;
        
        return {
            title,
            date,
            img
        }
    });

    await browser.close();
})();