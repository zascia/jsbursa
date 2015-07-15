/**
 * Created by ashu on 15-Jul-15.
 */
var app = require('../index');
/*;
var port = 20007;
var base_url = 'http://localhost' + ':' + port + '/' + 'api/users';
app.listen(port);*/

describe("Node server simple test", function(){
  it("The simplest test works", function(){
    var t = app.getName('Mike');
    expect(t).toEqual('Hello Mike');
  });
});
describe("Node server async test", function(){
  it("The async test works", function(done){
    app.asyncTest(function(x){
      expect(x).toEqual('Kotik');
      done();
    });
  });
});
