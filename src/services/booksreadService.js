var http = require('http');
var xml2js = require('xml2js');
var parser = xml2js.Parser({explicitArray:false});

var booksreadService = function(){
    var getBookById =function(id, cb){

        var options = {
            host: 'www.goodreads.com',
            path: '/book/show/19351?format=xml&key=TAUKaqli7gu8ajbl5DPFQ'
        };

        var callback = function(response){
            var str = '';
            response.on('data', function(chunk){
                str += chunk;
            });
            response.on('end',function(){
                console.log(str);
                parser.parseString(str,
                    function(err, result){
                        // console.log(result);
                        cb(null, result.GoodreadsResponse.book);
                    })
            })
        }
        
        http.request(options, callback).end();
    };
    return {
        getBookById: getBookById
    }
};

module.exports = booksreadService;