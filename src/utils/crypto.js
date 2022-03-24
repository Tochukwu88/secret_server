import crypto  from 'crypto';

const algorithm = 'aes-256-ctr';

const iv = crypto.randomBytes(16);

export const encrypt = (text) => {

    const cipher = crypto.createCipheriv(algorithm, process.env.HASH_SECRET, iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
};

export const decrypt = (hash) => {

    const decipher = crypto.createDecipheriv(algorithm, process.env.HASH_SECRET, Buffer.from(hash.iv, 'hex'));

    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

    return decrpyted.toString();
};

