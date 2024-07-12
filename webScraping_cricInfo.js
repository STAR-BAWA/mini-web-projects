const cheerio = require('cheerio');
const request = require('request');
const url="https://www.cricbuzz.com";
request(url, cb);

function cb(err, res, html) {
    if (err) console.log(err);
    else {
        extractHtml(html);
    }
}

function extractHtml(html) {
    const $ = cheerio.load(html);
    const matches = $('.cb-mtch-crd-rt .cb-match-card');
    //this will give more general matches 

    matches.each(function () {
        const match = $(this);
        const title = match.find('a').attr('title');
        const link = url+match.find('a').attr('href');
        const matchDetails = match.find('.cb-mtch-crd-hdr').text().trim();
        const team1 = match.find('.cb-hmscg-tm-name').first().text().trim();
        const team1Score = match.find('.cb-hmscg-tm-bat-scr').first().text().trim();
        const team2 = match.find('.cb-hmscg-tm-name').last().text().trim();
        const team2Score = match.find('.cb-hmscg-tm-bwl-scr').last().text().trim();
        const result = match.find('.cb-mtch-crd-state').text().trim();
      

        fetchMatchDetails(link,(venue)=>{console.log({
            title,
            link,
            matchDetails,
            team1,
            team1Score,
            team2,
            team2Score,
            result,
            venue
    });
    });
    });
}

function fetchMatchDetails(link, callback) {
    request(link, function(error, response, html) {
        if (error) {
            console.log(error);
        } else {
            const $ = cheerio.load(html);
            const venueElement = $('div.cb-nav-subhdr a[itemprop="location"]');
            const venue = {
                name: venueElement.find('span[itemprop="name"]').text().trim(),
                city: venueElement.find('span[itemprop="addressLocality"]').text().trim()
            };
            callback(venue);
        }
    });
}

