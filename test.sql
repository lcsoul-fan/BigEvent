create table userinfo(id int(11) primary key not null  unique auto_increment,username varchar(256),password varchar(256),nickname varchar(256),
email varchar(256),user_pic text)

alter table userinfo modify username varchar(256) not null ;