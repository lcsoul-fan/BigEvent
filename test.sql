create table userinfo(id int(11) primary key not null  unique auto_increment,username varchar(256) not null,password varchar(256) not null,nickname varchar(256),
email varchar(256),user_pic text)

alter table userinfo modify username varchar(256) not null ;

create table pub_article(id int(11) primary key not null unique auto_increment,title varchar(256) not null,
cate_id int(11) not null ,content text ,cover_img mediumblob  not null,state ENUM('已发布','草稿'),author_id int(11) not null,
pub_time datetime not null,foreign key(cate_id) references article_cates(id)); 


 alter table pub_article add foreign key (author_id) references userinfo (id);