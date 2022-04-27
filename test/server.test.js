process.env.NODE_ENV='test'
const chai=require('chai')
const expect=chai.expect
const should=chai.should()
const chaihttp=require('chai-http')
const server=require('../server')
chai.use(chaihttp)
describe('/testing all routes',()=>{
  it('test all blogs route',function(done){
    this.timeout(10000);
      chai.request(server)
      .get('/blogs')
      .end((err, res)=>{
        res.should.have.status(200)
          done();
      })
  })
  it('posting a blog should be in form of object ',function(done){
    this.timeout(10000);
      chai.request(server)
      .post('/blogs')
      .end((err, res)=>{
        res.should.be.a('object')
          done();
      })
  })
  it('deleted blog should return an object',function(done){
    this.timeout(10000);
      chai.request(server)
      .delete('/blogs')
      .end((err, res)=>{
        res.should.be.a('object')
          done();
      })
  })
  it('updated blog should be in form of object',function(done){
    this.timeout(10000);
      chai.request(server)
      .patch('/blogs')
      .end((err, res)=>{
        res.should.be.a('object')
          done();
      })
  })
  it('test all returned messages must be an object',function(done){
    this.timeout(10000);
      chai.request(server)
      .get('/contact')
      .end((err, res)=>{
        res.should.be.a('object')
          done();
      })
  })
  it('all tested message should be in form of objrct',function(done){
    this.timeout(10000);
      chai.request(server)
      .post('/contact')
      .end((err, res)=>{
        res.should.be.a('object')
          done();
      })
  })
  it('all tested message should be in form of objrct',function(done){
    this.timeout(10000);
      chai.request(server)
      .post('/profile')
      .end((err, res)=>{
        res.should.be.a('object')
          done();
      })
  })
  it('all tested message should be in form of objrct',function(done){
    this.timeout(10000);
      chai.request(server)
      .post('/user/register')
      .end((err, res)=>{
        res.should.be.a('object')
          done();
      })
  })
  it('credential email, username, and password should be in form of object',function(done){
    this.timeout(10000);
      chai.request(server)
      .post('/user/login')
      .end((err, res)=>{
        res.should.be.a('object')
          done();
      })
  })
  it('comment and likes should be in form of object',function(done){
    this.timeout(10000);
      chai.request(server)
      .post('/comment')
      .end((err, res)=>{
        res.should.be.a('object')
          done();
      })
  })
  
})  
