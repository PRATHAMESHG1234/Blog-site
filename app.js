//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');
const mongoose = require('mongoose');

const path = require('path');

// const posts = [];

const homeStartingContent =
  'Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.';
const aboutContent =
  'Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.';
const contactContent =
  'Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.';

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    'mongodb+srv://prathamesh-admin:prathamesh@cluster0.trskl7c.mongodb.net/blogDB',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  console.log('connected');
}

const postSchema = {
  title: String,
  content: String,
};

const Post = mongoose.model('Post', postSchema);

app.get('/home', function (req, res) {
  Post.find({}, function (err, posts) {
    res.render('home', {
      homeContent: homeStartingContent,
      // title : postTitle,
      posts: posts,
    });
  });
});
app.get('/contact', function (req, res) {
  res.render('contact', {
    contactContent: contactContent,
  });
});
app.get('/about', function (req, res) {
  res.render('about', {
    aboutContent: aboutContent,
  });
});
app.get('/compose', function (req, res) {
  res.render('compose');
});

app.post('/compose', function (req, res) {
  // console.log(content);
  var post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
  });

  post.save(function (err) {
    res.redirect('/');
  });
});

app.get('/post/:postId', function (req, res) {
  const requastedPostId = req.params.postId;
  // console.log(requastedPostTitle);

  Post.findOne({ _id: requastedPostId }, function (err, post) {
    // console.log(post)
    res.render('post', {
      title: post.title,
      post: post.content,
    });
  });
});

app.listen(3000, function () {
  console.log('Server started on port 3000');
});
