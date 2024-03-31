from Crypto.Random import get_random_bytes

key = get_random_bytes(16)
print(key, type(key))

with open('djangoProject/key.bin', 'wb') as f:
    f.write(key)

with open('djangoProject/key.bin', 'rb') as f:
    key1 = f.read()

print(key1, type(key1))