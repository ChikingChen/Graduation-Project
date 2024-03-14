from PyQt5 import QtWidgets

class MyWindow(QtWidgets.QWidget):
    def __init__(self):
        super().__init__()
        self.initUI()

    def initUI(self):
        # 创建部件
        button1 = QtWidgets.QPushButton('Button 1')
        button2 = QtWidgets.QPushButton('Button 2')
        button3 = QtWidgets.QPushButton('Button 3')
        button4 = QtWidgets.QPushButton('Button 4')

        # 创建网格布局管理器
        layout = QtWidgets.QGridLayout()

        # 将部件添加到布局中
        layout.addWidget(button1, 0, 0)  # 添加按钮1到第一行第一列
        layout.addWidget(button2, 0, 1)  # 添加按钮2到第一行第二列
        layout.addWidget(button3, 1, 0)  # 添加按钮3到第二行第一列
        layout.addWidget(button4, 1, 1)  # 添加按钮4到第二行第二列

        # 设置QWidget的布局为网格布局管理器
        self.setLayout(layout)

        self.setWindowTitle('Grid Layout Example')

if __name__ == '__main__':
    import sys
    app = QtWidgets.QApplication(sys.argv)
    window = MyWindow()
    window.show()
    sys.exit(app.exec_())
