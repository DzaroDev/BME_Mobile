//#region API Contants

export const APIMethod = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

export const APIURL = {
  BASE: "https://api.bmebharat.com",

  AUTH: "/api/oauth/token",
  SEND_OTP: "/api/oauth/send-otp",
  VERIFY_OTP: "/api/oauth/verify-otp",
  REGISTER: "/api/oauth/register",
  FORGOT_PASSWORD:"/api/oauth/forgot-password",
  RESET_PASSWORD:"/api/oauth/reset-password",

  GET_USER: "/api/user/",
  GET_ALL_USER: "/api/user/all?onlyAdmin=false",
  UPDATE_USER_PROFILE: "/api/user",
  //"/api/user/652b9b2d753cf040e92ccdc5/profile",

  UPDATE_PROFILE_IMAGE: "/api/user/profile-image",

  GET_PAGE_CONTENT: "/api/page-content",
  GET_ALL_CATEGORY: "/api/category/all",

  GET_ALL_COMPANY: "/api/company/list",

  GET_ALL_JOB: "/api/job-posting/all",
  CREATE_JOB: "/api/job-posting/create",

  GET_ALL_BLOG: "/api/blog/all",
  CREATE_BLOG: "/api/blog",

  GET_ALL_FORUM: "/api/forum/all",
  CREATE_FORUM: "/api/forum",

  GET_SUBSCRIPTION: "api/subscription/plans",
};

//#endregion
export const TERMS_AND_CONDITION = `${APIURL.BASE}/terms-and-conditions.html`;
export const PRIVACY_POLICY = `${APIURL.BASE}/privacy-policy.html`;
export const ABOUT_US = `${APIURL.BASE}/about-us.html`;

export const COLORS = {
  DARKBLUE: "#006CA5",
  LIGHTBLUE: "#6EA8DA",
  DARKGRAY: "#999",
  BLACK: "#000",
  WHITE: "#fff",
  PLACEHOLDER: "gray",
  BORDER: "gray",
};

//#region  Images
export const BME_Logo = require("./images/BME_Logo.png");
export const Dummy_Profile = require("./images/Dummy_Profile.png");
export const Icon_Company = require("./images/Icon_Company.jpg");
export const Placeholder = require("./images/Placeholder.jpg");

//#endregion

export const LoginType = {
  EMAIL: "email",
  PHONE: "phone",
  UNKNOWN: "unknown",
};

export const OTPPurpose = {
  SIGN_UP: "signup",
  FORGOT_PWD: "forgotPassword",
};

export const LocalStorage = {
  AccessToken: "AccessToken",
};

export const APPSTRING = {
  ERROR: "Error",
  App_Name: "BME India",
  No_Record: "No record found.",
  Required_OTP: "OTP is required.", 
  Required_Password: "Password is required.",
  Required_Confirm_Password: "Confirm password is required.",
  Password_Not_Matched: "Password not matched.",
  Invalid_Password_Lenght: "Password must be at least 6 characters",
  Required_Email_Or_Mobile: "Email/Mobile is required.",
  Invalid_Email: "Invalid email address",
  Invalid_Phone: "Invalid phone number",
  Required_Firstname: "First Name is required.",
  Required_Lastname: "Last Name is required.",
  Required_Profile:'Profile is required',
  Required_Category:'Category is required',
  Required_Buisness_Name:'Company Name is required',
  Required_Buisness_Email:'Email is required',
  Required_Buisness_Mobile:'Mobile is required',
  Required_Buisness_RegistrationId:'Registration Id is required',
  Required_Buisness_Address:'Address is required',
  Required_Buisness_City:'City is required',
  Required_Buisness_State:'State is required',
  Required_Buisness_Description:'Description is required',
  Required_Buisness_BiomedicalExpertise:'Biomedical Expertise  is required',
  Required_Product_Name:'Name is required',
  Required_Product_Service:'Product/Service is required',
  Required_Product_Description:'Description is required',
  Required_Product_Model_Name:'Model Name is required',
  Required_Product_Specification:'Specification is required',
  Required_Product_Category:'Category is required',
  Required_Product_Price:'Price is required',
};

//#region enum Constants
export const userTypes = {
  // ADMIN: 1, // super admin user
  MANUFACTURER: 2, // company user
  DEALER: 3, // company user
  SERVICEPROVIDER: 4, // company user
  RD_ORG: 5, // company user
  MEDICAL_PROF: 6, // non-company user
  BME_SENIOR: 7, // non-company user
  BME_STUDENT: 8, // non-company user
  OTHER: 9, // non-company user
  // SUB_ADMIN: 10, // sub admin user
};

export const companyUserTypes = [
  userTypes.MANUFACTURER,
  userTypes.DEALER,
  userTypes.SERVICEPROVIDER,
  userTypes.RD_ORG,
];

export const nonCompanyUserTypes = [
  userTypes.MEDICAL_PROF,
  userTypes.BME_SENIOR,
  userTypes.BME_STUDENT,
  userTypes.OTHER,
];

// export const adminUserTypes = [
//   userTypes.SUB_ADMIN,
// ];

export const categoryTypes = {
  Pharmaceuticals: "Pharmaceuticals",
  Biomedical_Test_Equipment: "Biomedical Test Equipment",
  Medical_Devices: "Medical Devices",
  Biotechnology: "Biotechnology",
  Research_and_Development: "Research and Development (R&D)",
  Diagnostic_Laboratories: "Diagnostic Laboratories",
  Biomedical_Imaging: "Biomedical Imaging",
  Pharmaceuticals_Distribution: "Pharmaceuticals Distribution",
  Clinical_Research: "Clinical Research",
  Regulatory_Affairs: "Regulatory Affairs",
  Healthcare_Information_Technology:
    "Healthcare Information Technology (HealthTech)",
  Biomedical_Consulting: "Biomedical Consulting",
  Contract_Research_Organizations: "Contract Research Organizations (CROs)",
  Biomedical_Manufacturing: "Biomedical Manufacturing",
  Pharmaceuticals_Marketing_and_Sales: "Pharmaceuticals Marketing and Sales",
  Biomedical_Ethics_and_Compliance: "Biomedical Ethics and Compliance",
  Biomedical_Education_and_Training: "Biomedical Education and Training",
  Biomedical_Waste_Management: "Biomedical Waste Management",
};



export const blogStatus = {
  INCOMPLETE: 1,
  APPROVED: 2,
  PUBLISHED: 3,
  UNPUBLISHED: 4,
};

export const blogStatusLabels = {
  1: "incomplete",
  2: "approved",
  3: "published",
  4: "unpublished",
};

export const subscriptionPlanPeriods = {
  MONTHLY: 1,
  QUARTERLY: 3,
  HALF_YEARLY: 6,
  YEARLY: 12,
};

export const sortOrder = {
  ASC_ORDER: 1,
  DESC_ORDER: -1,
};

export const pageConfigs = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  DEFAULT_SORT_ORDER: 1,
  DEFAULT_SORT_KEY: "updatedAt",
};

export const phoneRegex = /^\+?[0-9]{1,3}-?[0-9]{3}-?[0-9]{3}-?[0-9]{4}$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ContentType = {
  JSON: "application/json",
  FORM_URLENCODED: "application/x-www-form-urlencoded",
  FORM_DATA: "multipart/form-data",
};

export const DateTimeFormat = "dd/MM/yyyy";

export const Regex = {
  emptyStringRegex: /^$/,
  dateFormatRegex: /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/,
};
//#endregion
