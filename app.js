const fs = require('fs');

fs.readFile('resources/source.txt', 'utf8', function(err, contents) {
    var allTalksArr = contents.split("\n")
    allTalksArr.forEach(function(line, index, arr) {
        if (index === arr.length - 1 && line === "") {
            return;
        }
        console.log(index + " " + line);
    });
});