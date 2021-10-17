create table userinfo(id int(11) primary key not null  unique auto_increment,username varchar(256) not null,password varchar(256) not null,nickname varchar(256),
email varchar(256),user_pic text)

alter table userinfo modify username varchar(256) not null ;