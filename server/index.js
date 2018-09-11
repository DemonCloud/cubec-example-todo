const bodyparser = require('body-parser');

let data = {
  nodes: []
};

module.exports = function(app){
  app.use(bodyparser.json());
  app.use(bodyparser.urlencoded({ extended: true }));

  app.get('/getTodoList', function(req,res){
    res.json(data);
  });

  app.post('/syncTodoList', function(req,res){
    console.log(JSON.stringify(req.body));

    data = JSON.parse(JSON.stringify(req.body));

    res.json({
      statuCode: 200
    });
  });
};
