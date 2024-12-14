/* Use .env vars instead 
const SECRET_KEY = crypto.randomBytes(64).toString("hex"); */
const SECRET_KEY =
  "42ec09a3bc6d6932cc43c0598e018d595871d7c1ce02b6961ffb572e9f6e2cac8dbbaf0d3b98f0ffbb944022f102ff8a17df7b02205adaae1c939d1743f780eb";

const crossOriginOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

/* Use .env vars instead */
const port = 3001;

module.exports = {
  SECRET_KEY,
  crossOriginOptions,
};
