const ghpages = require('gh-pages');
const execa = require('execa');

execa.commandSync('npm run build',{
    stdout: process.stdout
});
ghpages.publish('dist', function(err) {
    if(err) {
        console.log("publish Error", err)
    }
    console.log('publish Success')
});