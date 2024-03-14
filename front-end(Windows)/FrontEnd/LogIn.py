from PyQt5 import QtWidgets
from PyQt5.QtWidgets import QApplication
from PyQt5.QtWidgets import QPushButton
from PyQt5.QtWidgets import QLineEdit
from PyQt5.QtWidgets import QDesktopWidget

class Login(QtWidgets.QWidget):
    def __init__(self):
        super().__init__()
        self.initUI()

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
        self.setGeometry(window_x, window_y, window_width, window_height)  # 设置窗口位置和大小
        self.setFixedSize(window_width, window_height)
        # 设置背景颜色
        self.setStyleSheet("background-color: #ffffff")  # RGB


