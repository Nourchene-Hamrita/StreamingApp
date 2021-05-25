const express = require('express');
const UserRoutes = require('./Routes/user.routes');
const VideoRoutes = require('./Routes/video.routes');
const ChannelRoutes=require('./Routes/channel.routes');
const CommentRoutes=require('./Routes/comment.routes');
const SavedRoutes=require('./Routes/saved.routes');
const FollowingRoutes=require('./Routes/following.routes');
const AdminRoutes=require('./Routes/admin.routes');


const cookieParser = require('cookie-parser');
const morgan = require('morgan');
require('dotenv').config({ path: './config/.env' });
require('./config/db');
const {checkUser,requireAuth}=require('./middleware/auth.middleware');
const path = require('path');
const cors =require('cors')

const app = express();

app.use('/public',express.static(path.join(__dirname, 'public'))); 
app.use(cors());
app.use((req, res, next)=> {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Expose-Headers','Content-Range')
  next();
});
/*const corsOptions={
  origin:process.env.CLIENT_URL,
  credentials:true,
  'allowedHeaders':['sessionId','Content-Type'],
  'exposedHeaders':'Content-Range',
  'methods':'GET,HEAD,PUT,POST,PATCH,DELETE',
  'prefLightContinue':false,}*/
 

app.use(express.json());


app.use('/users', UserRoutes);
app.use('/videos', VideoRoutes);
app.use('/channels', ChannelRoutes);
app.use('/comments', CommentRoutes);
app.use('/saved', SavedRoutes);
app.use('/following',FollowingRoutes);
app.use('/admin',AdminRoutes);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get('*',checkUser);
app.get('/jwtid',requireAuth,(req,res)=>{
  res.status(200).send(res.locals.user._id);
});


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

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});

/*app.get('/', function (req, res,next) {
  res.send('Hello World')
})*/
