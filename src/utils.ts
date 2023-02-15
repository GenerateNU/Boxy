import jwt from "jsonwebtoken";

export default class Utils {
  public static decodeToken(token: string) {
    return jwt.verify(token, "secret_key_change_later", (err, decoded) => {
      return decoded;
    });
  }

  public static encodeValue(value: string) {
    return jwt.sign(value, "secret_key_change_later");
  }
}
