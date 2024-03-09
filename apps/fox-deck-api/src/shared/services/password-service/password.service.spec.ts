import {PasswordService} from "./password.service";

describe("password.service.ts", () => {
    let passwordService: PasswordService;

    beforeEach(() => {
        passwordService = new PasswordService();
    })

    it("should encrypt the password", async () => {
        const text = "password";
        const encryptedPassword = await passwordService.encrypt(text);
        expect(encryptedPassword).not.toBe(text);
    })

    it("should return true, if the encrypted passwords match", async () => {
        const text = "password";
        const hash = await passwordService.encrypt(text);
        const result = await passwordService.compare(text, hash);
        expect(result).toBe(true);
    })
})