import * as crypto from "node:crypto";

export default function hashPwd(password: string, secret: string) {
  const hash = crypto
    .createHmac("sha256", secret)
    .update(password)
    .digest("hex");

  return hash;
}
