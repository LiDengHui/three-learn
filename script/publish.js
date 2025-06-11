const ghpages = require('gh-pages');
const execa = require('execa');

const a = async ()=> {
    await execa.execaCommand('npm run build', {
        stdout: process.stdout,
    });
    console.log(123)
    await ghpages.publish('dist',{
    }, function (err) {
        if (err) {
            console.log('publish Error', err);
        }
        console.log('publish Success');
    })
}

a();
