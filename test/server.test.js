process.env.NODE_ENV='test'
const chai=require('chai')
const expect=chai.expect
const should=chai.should()
const chaihttp=require('chai-http')
const server=require('../server')
chai.use(chaihttp)
describe('/first test',()=>{
  it('test all blogs route',function(done){
    this.timeout(10000);
      chai.request(server)
      .get('/blogs')
      .end((err, res)=>{
          res.should.have.status(200);
          done();
      })
  })
  
})  