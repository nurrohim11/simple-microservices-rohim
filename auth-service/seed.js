// const bycript = require('bcryptjs')
// bycript.hash('1234',8).then(res=>console.log(res))
var seeder = require('mongoose-seed');
var mongoose = require('mongoose');

// Connect to MongoDB via Mongoose
seeder.connect('mongodb://localhost:8080/db_microservices_rohim', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true
}, function () {

  // Load Mongoose models
  seeder.loadModels([
    './models/Auth'
  ]);

  // Clear specified collections
  seeder.clearModels(['Auth'], function () {

    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function () {
      seeder.disconnect();
    });

  });
});

var data = [
  {
    'model': 'Auth',
    'documents': [
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc901111'),
        username:'admin',
        password: '1234',
        passwordDecrypt:'1234'
      }
    ]
  },
];