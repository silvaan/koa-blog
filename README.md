# koa-blog
This is a very basic example of a blog built in Koa.js.

## Install and Run
```
git clone https://github.com/jrmiranda/koa-blog.git
npm install
npm start
```
## Models
This project has two Mongoose models, one for users and another for posts. Only users can create, update and delete posts.

## Authentication
The authentication was made using Passport.js with JWT Strategy. It could be easily implemented without Passport.js, but now it can be extended to another authentication strategies(social auth, oauth, etc) with Passport.js.
