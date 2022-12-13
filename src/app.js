const axios = require('axios');
const cheerio = require('cheerio');



function scrape(url, date){
    axios.get(url)
        .then(res => {
            const $ = cheerio.load(res.data);
            $('div[data-dates='+date+']').each((index, element) =>{
                
                const t1 = $(element).find('.timeDiv');
                // console.log(index + " " +element.text());
                console.log("hej")
                console.log(t1.text())
                // console.log()
            })
        }).catch(err => console.error(err));

}

let url = 'https://cloud.timeedit.net/kth/web/public01/ri152XQQ093Z50Qv17067gZ6y7Y7401Y8YQ1.html';
let date = '20221213'

scrape(url, date)