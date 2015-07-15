/**
 * Created by ashu on 15-Jul-15.
 */
var node = require('../index');
var port = 20007;
var base_url = 'http://localhost' + ':' + port + '/' + 'api/users';
node.listen(port);

describe("Node server test", function(){
  it("The simplest test works", function(){
    expect(User).toBeDefined();
  });
});

