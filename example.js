// Dependencies.
var detab = require('./index.js');

// Detab:
var four = detab('\tfoo\nbar\tbaz');
var two = detab('\tfoo\nbar\tbaz', 2);
var eight = detab('\tfoo\nbar\tbaz', 8);

// Yields:
console.log('text', four);
console.log('text', two);
console.log('text', eight);
