import pymysql

# 连接数据库
connection = pymysql.connect(host='localhost',
                             user='root',
                             password='lldq718scdyy',
                             database='db')

try:
    with connection.cursor() as cursor:
        # 编写SQL语句
        sql = "SELECT * FROM `accounttable`"
        cursor.execute(sql)

        # 获取所有查询结果
        results = cursor.fetchall()
        print(results)
finally:
    connection.close()  # 关闭数据库连接