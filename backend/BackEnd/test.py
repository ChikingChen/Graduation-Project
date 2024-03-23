import pymysql
import datetime

# 连接 MySQL 数据库
conn = pymysql.connect(
    host='127.0.0.1',    # 主机名
    port=3306,            # 端口号，MySQL默认为3306
    user='root',          # 用户名
    password='CZU20020718',  # 密码
    database='db'         # 数据库名称
)

def insert_account(nickname, telephone, psword, sex, birthday):
    with conn.cursor() as cursor:
        current_date = str(datetime.datetime.today())
        sql_insert = "INSERT INTO AccountTable (nickname, telephone, psword, rgtime, power, sex, birthday) VALUES "\
                     "('{nickname}', '{telephone}', '{psword}', '{current_date}', 0, {sex}, STR_TO_DATE('{birthday}', '%Y-%m-%d'))"
        cursor.execute(sql_insert.format(nickname=nickname, telephone=telephone, psword=psword, current_date=current_date, sex=sex, birthday=birthday))
        conn.commit()
        print("数据插入成功！")

if __name__ == "__main__":
    insert_account('chiking', '15726922163', '123456', 0, '2002-07-18')
