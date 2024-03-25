import 'dotenv/config';

export default () => ({
  port: process.env.PORT || 4000,
  cript_salt: process.env.CRYPT_SALT,
  secret_key_jwt: process.env.JWT_SECRET_KEY,
  secret_refresh_key_jwt: process.env.JWT_SECRET_REFRESH_KEY,
  expire_token: process.env.TOKEN_EXPIRE_TIME,
  expire_refresh_token: process.env.TOKEN_REFRESH_EXPIRE_TIME,
  db_username: process.env.POSTGRES_USER,
  db_password: process.env.POSTGRES_PASSWORD,
  db_host: process.env.POSTGRES_HOST,
  db_port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
});
