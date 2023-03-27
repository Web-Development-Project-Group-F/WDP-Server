/* 
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  user_profile_picture VARCHAR(255),
  bio VARCHAR(255)
);

insert into users (full_name, email,password,user_profile_picture) values ('test', 'test@gmail.com', '12345678','story1.jpeg');
insert into users (full_name, email,password,user_profile_picture) values ('test1', 'test1@gmail.com', '12345678', 'story1.jpeg');
insert into users (full_name, email,password,user_profile_picture) values ('test2', 'aa@gmail.com', '12345678','story1.jpeg');
insert into users (full_name, email,password,user_profile_picture) values ('test3', 'bb@gmail.com', '12345678','story1.jpeg');
insert into users (full_name, email,password,user_profile_picture) values ('test4', 'cc@gmail.com', '12345678','story1.jpeg');
update users  set  user_profile_picture='story1.jpeg' where id = 5
select * from users

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title varchar(225) not null,
  post_name VARCHAR(255) not null,
  content TEXT,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
select * from posts
insert into posts (title, post_name,user_id) values ('image 1', 'post.jpeg',1);
insert into posts (title, post_name,user_id) values ('image 1', 'post.jpeg',1);
insert into posts (title, post_name,user_id) values ('image 1', 'post.jpeg',1);


CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  comment_text TEXT NOT NULL,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  post_id INT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

select * from comments
insert into comments (comment_text, user_id,post_id) values ('sample comment', '1','1'); */


-- new database
create table posts(
id serial primary key,
title varchar(255) not null,
name varchar(255) not null
);

insert into posts(title, name) values('image 1','post.jpeg');
insert into posts(title, name) values('image 1','post1.jpeg');
insert into posts(title, name) values('image 1','post2.jpg');
insert into posts(title, name) values('image 1','post3.jpg');
