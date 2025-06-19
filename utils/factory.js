export const envUrl = {
  // baseUrl: "http://172.20.10.3:8085/cyrusWeb/", //~~~~~~~~~~~~~~~~Local Server~~~~~~~~~~~
  //baseUrl: "http://192.168.0.152:8085/cyrusWeb/", //~~~~~~~~~~~~~~~~Local Server~~~~~~~~~~~
  // baseUrl: "http://192.168.0.144:8085/cyrusWeb/", //~~~~~~~~~~~~~~~~Local Server~~~~~~~~~~~
  //baseUrl: "http://192.168.0.135:8085/cyrusWeb/", //~~~~~~~~~~~~~~~~Live Server~~~~~~~~~~~
  //baseUrl: "http://35.154.92.144:8085/cyrusWeb/", //~~~~~~~~~~~~~~~~Live Server~~~~~~~~~~~
  // baseUrl: "http://20.227.166.148:8085/cyrusWeb/",
  // baseUrl: "http://20.227.166.148:8085/cyrusWeb/",
  // baseUrl: "http://20.227.165.197/cyrusWeb/",
  // baseUrl: "http://192.168.0.181:8085/cyrusWeb/", //-----rajat office ip-----//
  // baseUrl: "http://192.168.29.242:8085/cyrusWeb/", //-----Ishaan home ip-----//
  baseUrl: "https://node.sparkywarehouse.com.au/cyrusWeb/",
  // baseUrl: "http://localhost:8085/cyrusWeb/", //-----Ishaan home ip-----//
  // baseUrl: "http://192.168.0.114:8085/cyrusWeb/", //-----Ishaan office ip-----//
  // baseUrl: "https://local-sparky-node.loca.lt/cyrusWeb/", //-----local tunnel dev-----//
};

export const endPoint = {
  webCategory: "webCategory",
  webAttribute: "webAttribute",
  HomePageData: "HomePageData",
  subCategoryByFilter: "subCategoryByFilter",
  register: "register",
  login: "login",
  updateUserProfile: "updateUserProfile",
  updatePassword: "updatePassword",
  updatePasswordFromResetLink: "updatePasswordFromResetLink",
  logout: "logout",
  eyJhdHRyaWJ1dGVzIjp7InVzZXJfYXR0cmlidXRlIjoicmFzaHBhbDI5QGdtYWlsLmNvbSJ9LCJ1c2VySWQiOm51bGx9:
    "eyJhdHRyaWJ1dGVzIjp7InVzZXJfYXR0cmlidXRlIjoicmFzaHBhbDI5QGdtYWlsLmNvbSJ9LCJ1c2VySWQiOm51bGx9",
  productSearch: "productSearch",
  saveFinalOrder: "saveFinalOrder",
  validateEmail: "validateEmail",
  resetPassword: "resetPassword",
  uploadCreditMemberForm: "uploadCreditMemberForm",
  deleteUploadCreditMemberForm: "deleteUploadCreditMemberForm",
  getCreditFormsList: "getCreditFormsList",
  getBrandsList: "getBrandsList",
  getCataloguesList: "getCataloguesList",
  getPreassemblesCategory: "getPreassemblesCategory",
  getCustPreassemblesData: "getCustPreassemblesData",
  saveQuotation: "saveQuotation",
  getShippingCharges: "getShippingCharges",
  getUserDetailsFromDB: "getUserDetailsFromDB",
  saveCreditPayment: "saveCreditPayment",
  eFormObject: "eFormObject",
  wishlist: "wishlist",
  myOrders: "myOrders",
  verifyTokens: "verifyTokens",
  getProductFilters: "getProductFilters",
  getProductsByFilters: "getProductsByFilters,",
  sendEnquiry: "sendEnquiry",
  saveCustomProductQuote: "saveCustomProductQuote",
};
export const imageURLs = ({ images, title }) => {
  // if no img in uploaded in cms
  if (images == null) {
    return [
      {
        original: "/default-product.png",
        thumbnail: "/default-product.png",
        defaultImage: "/default-product.png",
        lifestyleImage: "/default-product.png",
        originalAlt: "No Image Available",
      },
    ];
  }
  return images.map((image) => {
    return {
      original:
        image && image.path
          ? process.env.PRODUCT_CDN_URL + image.path
          : "/default-product.png",
      thumbnail:
        image && image.path
          ? process.env.PRODUCT_CDN_URL + image.path
          : "/default-product.png",
      defaultImage: image.defaultImage,
      lifestyleImage: image.lifestyleImage,
      originalAlt: title,
    };
  });
};
