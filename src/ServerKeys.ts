import { get } from "env-var";

export class ServerKeys {
  public static REDIS_URL = get("REDIS_URL").required().asUrlString();
  public static TELEGRAM_SECRET = get("TELEGRAM_SECRET").required().asString();
  public static SMTP_HOST = get("SMTP_HOST").required().asString();
  public static SMTP_PORT = get("SMTP_PORT").required().asPortNumber();
  public static SMTP_AUTH_USER = get("SMTP_AUTH_USER").required().asString();
  public static SMTP_AUTH_PASS = get("SMTP_AUTH_PASS").required().asString();
  public static MAIL_FROM = get("MAIL_FROM").required().asEmailString();
}