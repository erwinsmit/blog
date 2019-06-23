var fs = require('fs');

// destination.txt will be created or overwritten by default.
fs.copyFile('CNAME', 'public/CNAME', (err) => {
    if (err) throw err;
    console.log('CNAME copied to public dir');
});