drop database db;
create database db;
use db;
create table AccountTable (
  id int auto_increment primary key, -- 用户账号
  nickname varchar(30), -- 昵称
  avatar varchar(20), -- 头像图片号
  telephone varchar(50), -- 手机号
  psword varchar(20), -- 密码
  rgtime date, -- 注册时间
  power int, -- 权限
  mdtime date, -- 上次修改账号时间
  sex int, -- 性别
  birthday date -- 生日
);
create table DoctorTable (
  id int primary key, -- 用户账号
  nm varchar(10), -- 姓名
  birthday date, -- 生日
  edu int, -- 学历
  pic varchar(30), -- 个人照片编号
  introduce varchar(300), -- 个人简介
  foreign key (id) references AccountTable(id)
);
create table ClinicTable (
  id int auto_increment primary key, -- 诊所号
  place varchar(100), -- 诊所地点
  worktime varchar(60), -- 诊所营业时间
  pic varchar(30) -- 诊所封面图片编号
);
create table CommentTable (
  id int auto_increment primary key, -- 评论编号
  mainid int, -- 被评论编号，0代表提问
  cmt varchar(420), -- 评论内容
  tm time, -- 发表时间
  accountid int, -- 发表用户账号
  foreign key (accountid) references AccountTable(id)
);
create table LikeTable (
  id int auto_increment primary key, -- 点赞编号
  tm time, -- 点赞时间
  accountid int, -- 点赞用户编号
  foreign key (accountid) references AccountTable(id)
);
create table CommentLikeTable (
  commentid int, -- 评论编号
  likeid int, -- 点赞编号
  primary key (commentid, likeid),
  foreign key (commentid) references CommentTable(id),
  foreign key (likeid) references LikeTable(id)
);
create table ClinicDoctorTable (
  clinicid int, -- 诊所编号
  doctorid int, -- 医生编号
  tm varchar(60), -- 出诊时间
  primary key(clinicid, doctorid),
  foreign key (clinicid) references ClinicTable(id),
  foreign key (doctorid) references DoctorTable(id)
);
create table DoctorServiceTable (
  accountid int, -- 用户编号
  service varchar(30), -- 服务
  primary key (accountid, service),
  foreign key (accountid) references AccountTable(id)
);
create table ClinicServiceTable (
  clinicid int, -- 诊所编号
  service varchar(30), -- 服务
  primary key (clinicid, service),
  foreign key (clinicid) references ClinicTable(id)
);
create table EvaluateTable (
  id int auto_increment primary key, -- 评价编号
  clinicid int, -- 被评价诊所
  doctorid int, -- 被评价医生
  mark int, -- 评价分数
  accountid int, -- 发表用户
  tm time, -- 发表时间
  evaluation varchar(420), -- 评价文本，不多于140字
  foreign key (clinicid) references ClinicTable(id),
  foreign key (doctorid) references AccountTable(id),
  foreign key (accountid) references AccountTable(id)
);
create table PictureTable (
  id int auto_increment primary key, -- 图片编号
  addr varchar(50) -- 图片地址
);
create table EvaluatePictureTable (
  picid int, -- 图片编号
  evaid int, -- 评论编号
  primary key (picid, evaid),
  foreign key (evaid) references EvaluateTable(id),
  foreign key (picid) references PictureTable(id)
);
create table BrowseTable (
  id int auto_increment primary key, -- 浏览编号
  accountid int, -- 用户账号
  tm time, -- 浏览时间
  clinicid int, -- 诊所编号
  foreign key (accountid) references AccountTable(id),
  foreign key (clinicid) references ClinicTable(id)
);
create table NotifyTable (
  id int auto_increment primary key, -- 通知编号
  accountid int, -- 用户账号
  notification varchar(420), -- 通知内容
  foreign key (accountid) references AccountTable(id)
);
create table ChatTable (
  accountid1 int, -- 用户1账号，发出者
  accountid2 int, -- 用户2账号
  tm time, -- 发送时间
  chat varchar(420), -- 聊天的一段话
  primary key (accountid1, accountid2, tm),
  foreign key (accountid1) references AccountTable(id),
  foreign key (accountid2) references AccountTable(id)
);