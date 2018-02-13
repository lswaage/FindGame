

const rp = require('request-promise');
const cheerio = require('cheerio');

const options = {
    uri: 'https://www.boardgamegeek.com/browse/boardgame',
    //    uri: 'file://C:/projects/FindGame/boardgame.html',
    transform: function (body) {
        return cheerio.load(body);
    }
};

rp(options)
    .then(($) => {
        //    console.log($);
        $('.collection_rank').each(function (i, el) {
            var rank = $(this).text().trim();
            var thumbnail = $(this).siblings('.collection_thumbnail').find('[src]').attr('src');
            var title = $(this).siblings('.collection_objectname').find('[href]').text().trim();
            var url =  'https://www.boardgamegeek.com' + $(this).siblings('.collection_objectname').find('[href]').attr('href');
            var id = url.match(/[0-9]+/g)[0];

            console.log(rank 
                + ' ' + title
                + ' ' + id
                + ' ' + url
                + ' ' + thumbnail
            );
        });



        console.log('SUCCESS!');
    })
    .catch((err) => {
        console.log(err);
        console.log('ERROR!');
    });

