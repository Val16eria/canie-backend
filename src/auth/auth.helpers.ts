import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export const SECRET_ACCESS = 'canie_access_secret_token';
export const SECRET_REFRESH = 'canie_refresh_secret_token';
export const refreshTokens: string[] = [];

export const random = () => crypto.randomBytes(128).toString('base64');
export const authentication = (salt: string, password: string): string => {
    return crypto.createHmac('sha256', [salt, password].join('/'))
    .update('CANIE-SECRET')
    .digest('hex');
};

export const generateToken = (
    name: string, 
    role: string, 
    secret: jwt.Secret, 
    options?: jwt.SignOptions
) => {
    const token = jwt.sign({ name, role }, secret, options);
    return token;
}
