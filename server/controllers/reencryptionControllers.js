const { execFile } = require('../utils/reencryption.py');

function generateReencryptionKey(sourcePrivateKey, targetPublicKey) {
    execFile('python', ['generate_reencryption_key.py', sourcePrivateKey, targetPublicKey], (error, stdout, stderr) => {
        if (error) {
            console.error('Error:', error);
            return;
        }
        if (stderr) {
            console.error('Stderr:', stderr);
            return;
        }
        console.log('Encrypted Reencryption Key:', stdout);
    });
}

const sourcePrivateKeyPEM = ``;

const targetPublicKeyPEM = ``;

generateReencryptionKey(sourcePrivateKeyPEM, targetPublicKeyPEM);
