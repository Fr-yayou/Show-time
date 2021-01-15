export declare class PasswordHasherService {
    hashPassword(password: string): Promise<string>;
    comparePassword(plainText: any, encryptedPassword: any): Promise<boolean>;
}
