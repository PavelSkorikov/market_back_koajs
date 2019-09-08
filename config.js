const rc = require('rc');

module.exports = rc('market', {
	port: process.env.PORT || 3000,
	secret: 'verysecretkey',
	time: '1m'
});