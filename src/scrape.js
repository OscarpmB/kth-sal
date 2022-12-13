const axios = require('axios');
const cheerio = require('cheerio');






//write headers



axios.get('https://dev.to/')
    .then(res => {
        const $ = cheerio.load(res.data)
        console.log(res)
        $('.crayons-story').each((index, element) => {

            const author = $(element).find('.profile-preview-card__trigger').text().replace(/\s\s+/g, '')
            const blogTitle = $(element).find('.crayons-story__title').text().replace(/\s\s+/g, '')
            const blogLink = $(element).find('a').attr('href');
            const readTime = $(element).find('.crayons-story__tertiary').text()
            const dev = 'https://dev.to'
            const joinedBlogLink = `${dev}` + `${blogLink}`;
            // console.log(author);
            // writeStream.write(`Author: ${author}, \n Blog title is : ${blogTitle} ,\n Blog link: ${joinedBlogLink}, \n Blog read time : ${readTime} \n`);
        });


    }).catch(err => console.error(err))

