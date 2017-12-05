const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('/GET/ CrimesData', () => {
	it('it should GET all the crime data from specific location on the date', (done) => {
		chai.request(server)
		.get('/api/getCrimesData/:date/:lat/:lng')
		.end((err, res) => {
			res.should.have.status(200);
			res.body.should.be.a('array');
			res.body.length.should.be.eql(0);
			done();
		});
	});
});
