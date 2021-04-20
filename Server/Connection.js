const express = require('express');
const UserRoutes = require('./Routes/user.routes');
const VideoRoutes = require('./Routes/video.routes');
const ChannelRoutes=require('./Routes/channel.routes');
const CommentRoutes=require('./Routes/comment.routes');
const SavedRoutes=require('./Routes/saved.routes');
const FollowingRoutes=require('./Routes/following.routes');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
require('dotenv').config({ path: './config/.env' });
require('./config/db');
const {checkUser,requireAuth}=require('./middleware/auth.middleware');
const path = require('path');

const app = express();
app.use('/public',express.static(path.join(__dirname, 'public'))); 


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('*',checkUser);
app.get('/jwtid',requireAuth,(req,res)=>{
  res.status(200).send(res.locals.user._id);
});



app.use('/users', UserRoutes);
app.use('/videos', VideoRoutes);
app.use('/channels', ChannelRoutes);
app.use('/comments', CommentRoutes);
app.use('/saved', SavedRoutes);
app.use('/following',FollowingRoutes);

app.use(morgan('dev'));
app.use((req, res, next) => {
  const err = new Error("Not found")
  err.status = 404
  next(err)
});
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  })

});
/*app.get('/', function (req, res,next) {
  res.send('Hello World')
})*/
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});


