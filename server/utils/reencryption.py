from Crypto.PublicKey import RSA
from Crypto.Random import get_random_bytes
from Crypto.Cipher import PKCS1_OAEP
import sys

def generate_reencryption_key(source_private_key_pem, target_public_key_pem):
    # 加载源私钥
    source_private_key = RSA.import_key(source_private_key_pem)
    cipher_rsa = PKCS1_OAEP.new(source_private_key)
    
    # 生成随机密钥
    reencryption_key = get_random_bytes(16)
    
    # 使用目标公钥加密重加密密钥
    target_public_key = RSA.import_key(target_public_key_pem)
    cipher_rsa_target = PKCS1_OAEP.new(target_public_key)
    encrypted_reencryption_key = cipher_rsa_target.encrypt(reencryption_key)
    
    return encrypted_reencryption_key.hex()

if __name__ == "__main__":
    source_private_key_pem = sys.argv[1]
    target_public_key_pem = sys.argv[2]
    
    encrypted_reencryption_key = generate_reencryption_key(source_private_key_pem, target_public_key_pem)
    print(encrypted_reencryption_key)
