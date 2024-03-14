import sys

from PyQt5 import QtWidgets
from PyQt5.QtWidgets import QApplication
from PyQt5.QtWidgets import QPushButton
from PyQt5.QtWidgets import QLineEdit
from PyQt5.QtWidgets import QDesktopWidget

from LogIn import Login

class SignIn(QtWidgets.QWidget):
    def __init__(self):
        super().__init__()
        self.initUI()
    def openSignIn(self):
        self.LogIn = Login()
        self.LogIn.show()
    def AccountClicked(self):
        # 从短信快捷登录切换到账号密码方式
        self.AccountButton.clicked.disconnect(self.AccountClicked)
        self.TelephoneButton.clicked.connect(self.TelephoneClicked)
        self.TelephoneButton.setStyleSheet("border: 1px solid black;"
                                           "border-top: none;"
                                           "border-left: none;"
                                           "border-right: none")
        self.AccountButton.setStyleSheet("border: 1px solid black;")
        self.account.setPlaceholderText("请输入注册时的账号")
        self.password.setPlaceholderText("请输入你的密码")
        return
    def TelephoneClicked(self):
        # 从账号密码方式切换到短信快捷登录
        self.AccountButton.clicked.connect(self.AccountClicked)
        self.TelephoneButton.clicked.disconnect(self.TelephoneClicked)
        self.AccountButton.setStyleSheet("border: 1px solid black;"
                                           "border-top: none;"
                                           "border-left: none;"
                                           "border-right: none")
        self.TelephoneButton.setStyleSheet("border: 1px solid black;")
        self.account.setPlaceholderText("请输入你的手机号码")
        self.password.setPlaceholderText("请输入验证码")
        return
    def initUI(self):
        ## 创建主窗口
        # 获取桌面尺寸
        desktop = QDesktopWidget()
        screen_size = desktop.screenGeometry().size()
        screen_width = screen_size.width()
        screen_height = screen_size.height()
        # 设置主窗口尺寸
        window_width = 450
        window_height = 600
        # 设置主窗口位置
        window_x = int((screen_width - window_width) / 2)
        window_y = int((screen_height - window_height) / 2)
        # 设置主窗口的位置和尺寸
        self.setGeometry(window_x, window_y, window_width, window_height) # 设置窗口位置和大小
        self.setFixedSize(window_width, window_height)
        # 设置背景颜色
        self.setStyleSheet("background-color: #ffffff") # RGB

        ## 创建主窗口控件
        # 创建账号填写框
        self.account = QLineEdit()
        self.account.setFixedWidth(200)
        self.account.setFixedHeight(30)
        self.account.setStyleSheet("background-color: white")
        self.account.setPlaceholderText("请输入注册时的账号")
        self.account.setStyleSheet("border: none; border-bottom: 1px solid black;")
        layoutH1 = QtWidgets.QHBoxLayout() # 将账号填写框放入水平控件中
        layoutH1.addWidget(self.account)
        # 创建密码填写框
        self.password = QLineEdit()
        self.password.setFixedWidth(200)
        self.password.setFixedHeight(30)
        self.password.setStyleSheet("background-color:white")
        self.password.setPlaceholderText("请输入你的密码")
        self.password.setStyleSheet("border: none; border-bottom: 1px solid black;")
        layoutH2 = QtWidgets.QHBoxLayout() # 将密码填写框放入水平控件中
        layoutH2.addWidget(self.password)
        # 创建登录按钮
        self.login = QPushButton("登录")
        self.login.setFixedWidth(100)
        self.login.setFixedHeight(30)
        layoutH3 = QtWidgets.QHBoxLayout() # 将登录按钮放入水平控件中
        layoutH3.addWidget(self.login)
        # 创建注册按钮
        self.signin = QPushButton("注册")
        self.signin.setFixedWidth(100)
        self.signin.setFixedHeight(30)
        layoutH3.addWidget(self.signin) # 将注册按钮放入水平控件中
        # 创建登录方式选项
        self.TelephoneButton = QPushButton("短信快捷登录")
        self.TelephoneButton.setFixedWidth(200)
        self.TelephoneButton.setFixedHeight(30)
        self.TelephoneButton.setStyleSheet("border: 1px solid black;"
                                           "border-top: none;"
                                           "border-left: none;"
                                           "border-right: none")
        self.AccountButton = QPushButton("账号密码登录")
        self.AccountButton.setFixedWidth(200)
        self.AccountButton.setFixedHeight(30)
        self.AccountButton.setStyleSheet("border: 1px solid black;")
        layoutH4 = QtWidgets.QHBoxLayout()
        layoutH4.addWidget(self.AccountButton)
        layoutH4.addWidget(self.TelephoneButton)
        # 将水平布局管理器加入垂直布局管理器
        layoutV = QtWidgets.QVBoxLayout()
        layoutV.addLayout(layoutH4)
        layoutV.addLayout(layoutH1)
        layoutV.addLayout(layoutH2)
        layoutV.addLayout(layoutH3)
        # 显示垂直布局管理器
        self.setLayout(layoutV)
        # 刚进入的情况下只能使用账号密码登录
        # 故账号密码的框是被选中的
        # 短信快捷登录方式的框连接了槽函数
        self.signin.clicked.connect(self.openSignIn)
        self.AccountButton.clicked.connect(self.AccountClicked)
        self.TelephoneButton.clicked.connect(self.TelephoneClicked)


if __name__ == '__main__':
    # 创建应用程序对象
    app = QApplication(sys.argv)

    # 创建并显示注册页面
    window = SignIn()
    window.show()

    # 应用程序事件循环
    sys.exit(app.exec_())