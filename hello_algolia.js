// hello_algolia.js
const algoliasearch = require('algoliasearch');

console.log('algoliasearch', algoliasearch);
// Connect and authenticate with your Algolia app
const client = algoliasearch('8CJ53XCBCH', 'YourWriteAPIKey');

// Create a new index and add a record
const index = client.initIndex('test_index');
const record = { objectID: 2, name: 'test_recordd' };
index.saveObject(record).wait();

// Search the index and print the results
index.search('test_record').then(({ hits }) => console.log(hits[0]));
