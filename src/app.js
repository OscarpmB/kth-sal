const axios = require('axios');
const cheerio = require('cheerio');
const pretty = require('pretty');



function scrape(url, date){
    
    axios.get(url)
        .then(res => {
            const $ = cheerio.load(res.data);
            $('div[data-dates='+date+']').each((index, element) =>{

                const times = $(element).find('.timeDiv');

                console.log(times.text())
                console.log(times.text().length)
                const t = []
                // for(let i = 0; i*5 < times.text().length; i++){
                //     t[i] = times.substr(i*5, 5);
                // }
                // console.log(t.toString());
            })
        }).catch(err => console.error(err));

}

async function scraping(url, date){
    const times = [];
    try{
        const res = await axios.get(url);
        const $ = cheerio.load(res.data);
        const timesElem = $('div[data-dates='+date+']').find('.timeDiv');
        timesElem.each((i,e) => {
            // Save and store the value of booked room. times = [s1,e1,s2,e2....]
            if(i % 2 == 0){
                times[i+1] = $(e).text(); 
            }else{
                times[i-1] = $(e).text()
            }
        });
    }catch ( err){
        console.log(err);
    }
    for(let i = 0; i < times.length; i++){
        console.log(times[i]);
    }

}

let url = 'https://cloud.timeedit.net/kth/web/public01/ri152XQQ093Z50Qv17067gZ6y7Y7401Y8YQ1.html';
let date = '20221213'

// scrape(url, date)
scraping(url, date)