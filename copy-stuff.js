const fs = require('fs-extra')

fs.copySync('CNAME', 'public/CNAME');

fs.copySync('src/performancepoc', 'public/performancepoc');