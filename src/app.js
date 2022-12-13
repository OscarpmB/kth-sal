const axios = require('axios');
const cheerio = require('cheerio');
// const { each } = require('cheerio/lib/api/traversing');
const pretty = require('pretty');

const urls = {
    "e34": "https://cloud.timeedit.net/kth/web/public01/ri152XQQ093Z50Qv17067gZ6y7Y7403Y8YQ1.html",
    "e33": "https://cloud.timeedit.net/kth/web/public01/ri152XQQ093Z50Qv17067gZ6y7Y7401Y8YQ1.html",
    "e31": "https://cloud.timeedit.net/kth/web/public01/ri152XQQ093Z50Qv17067gZ6y7Y7404Y8YQ1.html"
}

const eRooms = ["e32","e33","e31"];

const hours = [8,9,10,11,12,13,14,15,16,17]

async function getTimes(url, date){
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
    return times;
}

function parseHour(time){
    var hour = time.substr(0,2);
    if(hour.charAt(0) == '0'){
        hour = hour.substr(1,1);
    }
    return hour;
}

function calcAvailability(booked){
    var hours = [];
    for(var i = 8; i <=17 ; i++){
        hours[i-8] = true;
    }
    for(var i = 0; i < booked.length; i=i+2){
        // console.log("booked[i]="+booked[i] + " booked[i+1]= " + booked[i+1])
        var start = parseHour(booked[i]);
        var end = parseHour(booked[i+1]);
        // console.log(start + " - " + end)
        for(var i = parseInt(start); i <= parseInt(end); i++){
            hours[i-8] = false;
        }
    }
    return hours;
}

async function findAvailable(){
    // Get todays date
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    date = yyyy+mm+dd;
    console.log(date);
    var rooms = [] 
    // var obj = {};
    for(var key in urls ){
        console.log(key + ": " + urls[key]);
        var unavailable = await getTimes(urls[key], date);
        var available = calcAvailability(unavailable)
        // available.forEach(e => {console.log(e)});
        var obj = Object.assign(...hours.map((h, i) => ({[h]: available[i]})))
        // console.log(obj);
        rooms.push(obj)
    }
    // rooms.forEach(e => { console.log(e)} )
    var availability = Object.assign(...eRooms.map((r,i) => ({[r]: rooms[i]})))
    console.log(x)
    return availability;
} 

findAvailable();