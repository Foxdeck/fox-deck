import { Injectable } from "@nestjs/common";
import bcrypt from "bcrypt";

/**
 * Services which handles password generation and validation.
 */
@Injectable()
export class PasswordService {
  saltRounds = 10;

  /**
   * Encrypt a string using bcrypt.
   * @param text {string} the text to encrypt.
   */
  async encrypt(text: string): Promise<string> {
    const salt = bcrypt.genSaltSync(this.saltRounds);
    return bcrypt.hashSync(text, salt);
  }

  /**
   * Compares a given text to a hash.
   * @param text {string} the text to compare
   * @param hash {string} the hash to compare to
   */
  async compare(text: string, hash: string): Promise<boolean> {
    return bcrypt.compare(text, hash);
  }
}
