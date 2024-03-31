from Crypto.Cipher import AES
from base64 import b64decode, b64encode

def encrypt_message(message):
    # 读取密钥
    with open('key.bin', 'rb') as f:
        key = f.read()
    # 使用加密密钥和eax模式创建加密对象
    cipher = AES.new(key, AES.MODE_EAX)
    # 将消息转换为 utf-8 编码的字符串用于加密
    ciphertext, tag = cipher.encrypt_and_digest(message.encode('utf-8'))
    print(ciphertext, tag)
    # 随机生成的一次性值加认证标签加密文数据进行base64编码
    encrypted_data = b64encode(cipher.nonce + tag + ciphertext)
    return encrypted_data

def decrypt_message(message):
    with open('key.bin', 'rb') as f:
        key = f.read()
    # 对密文进行64位解码
    message = b64decode(message)
    # 将解码后的message分解为nonce，tag，ciphertext
    nonce = message[:16]
    tag = message[16:32]
    ciphertext = message[32:]
    # 使用aes创建一个新的解密对象
    cipher = AES.new(key, AES.MODE_EAX, nonce=nonce)
    # 使用解密对象对密文进行解密并认证标签的有效性
    decryted_data = cipher.decrypt_and_verify(ciphertext, tag)
    # 将解密的数据以utf-8的形式解码
    return decryted_data.decode('utf-8')