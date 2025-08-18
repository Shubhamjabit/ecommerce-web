// if (process.env.DEVELOPMENT_MODE === "yes") {
//   require("dotenv").config({ path: `/.env.local` });
// } else {
//   require("dotenv").config({ path: `/.env.production` });
// }

// console.log("process.env", process.env);
module.exports = () => {
  const env = {
    WEB_DOMAIN: process.env.WEB_DOMAIN,
    REACT_APP_STORAGESASTOKEN: process.env.REACT_APP_STORAGESASTOKEN,
    REACT_APP_STORAGERESOURCENAME: process.env.REACT_APP_STORAGERESOURCENAME,
    CATEGORY_CDN_URL: process.env.CATEGORY_CDN_URL,
    INDUSTRY_CDN_URL: process.env.INDUSTRY_CDN_URL,
    PRODUCT_CDN_URL: process.env.PRODUCT_CDN_URL,
    BANNER_CDN_URL: process.env.BANNER_CDN_URL,
    BRAND_CDN_URL: process.env.BRAND_CDN_URL,
    CREDIT_FILES_CDN_URL: process.env.CREDIT_FILES_CDN_URL,
    TLM_SAVIY_SHIPPING_API: process.env.TLM_SAVIY_SHIPPING_API,
    SALT: process.env.SALT,
    COMMONWEALTH_BANK_API_PUBLIC_KEY:
      process.env.COMMONWEALTH_BANK_API_PUBLIC_KEY,
    COMMONWEALTH_BANK_CARD_PAYMENTS_GATEWAY_ID:
      process.env.COMMONWEALTH_BANK_CARD_PAYMENTS_GATEWAY_ID,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_PUBLISHABLE_KEY_PROD: process.env.STRIPE_PUBLISHABLE_KEY_PROD,
    STRIPE_SECRET_KEY_PROD: process.env.STRIPE_SECRET_KEY_DEV,
  };

  const images = {
    // unoptimized: true,
    //loader: "imgix",
    domains: [
      `${process.env.BANNER_CDN_URL}`,
      `${process.env.WEB_DOMAIN}`,
      "tricabtstbucket.blob.core.windows.net",
      "d2cw2jbf260r3c.cloudfront.net",
      "ds3spjfxfwgux.cloudfront.net",
    ],
    //unoptimized: true,
    loader: "custom",
    // loaderFile: "./my/image/loader.js",
  };

  return {
    images,
    env,
  };
};
