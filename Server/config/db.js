const mongoose = require('mongoose');
mongoose.set('useFindAndModify',false);
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/videostreaming', {
  useNewUrlParser: true,
  useUnifiedTopology: true

});
mongoose.connection.once('open', _ => {
  console.log('Mongodb connected successfully')

}).on('Error', function (error) {
  console.log('Failed to connect to Mongodb:', error)

});