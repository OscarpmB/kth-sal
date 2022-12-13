const axios = require('axios');
const cheerio = require('cheerio');



function scrape(url, date){
    axios.get(url)
        .then(res => {
            const $ = cheerio.load(res.data);
            $('div[data-dates='+date+']').each((index, element) =>{

                $(element).find('.timeDiv').toArray();
                console.log(times.text())
                
            })
        }).catch(err => console.error(err));

}

function scraping(url, date){
    const res = axios.get(url);
    const $ = cheerio.load(res.data);
    console.log($.html());
}

let url = 'https://cloud.timeedit.net/kth/web/public01/ri152XQQ093Z50Qv17067gZ6y7Y7401Y8YQ1.html';
let date = '20221213'

// scrape(url, date)
scraping(url, date)