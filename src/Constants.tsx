//#region API Contants

export const APIMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
}

export const APIURL = {

  BASE: "http://127.0.0.1:8080",

  AUTH: "/api/oauth/token",
  SEND_OTP: "/api/oauth/send-otp",
  VERIFY_OTP: "/api/oauth/verify-otp",
  REGISTER: "/api/oauth/register",

  GET_USER: "/api/user/",
  GET_ALL_USER: "/api/user/all?onlyAdmin=false",
  UPDATE_USER_PROFILE: "/api/user/:userId/profile",
  UPDATE_PROFILE_IMAGE: "/api/user/profile-image",
  UPDATE_ADMIN_PROFILE: "/api/user/:userId/admin-profile",
  RESET_PASSWORD: "/api/user/admin/:userId/reset-password",

  GTE_PAGE_CONTENT: '/api/page-content'
}
//#endregion

export const COLORS = {
  DARKBLUE: '#006CA5',
  LIGHTBLUE: '#6EA8DA',
  DARKGRAY: '#999',
  BLACK: '#000',
  WHITE: '#fff',
  PLACEHOLDER: 'gray',
  BORDER: 'gray'
}


//#region  Images
export const BME_Logo = require('./images/BME_Logo.png');
export const Dummy_Profile = require('./images/Dummy_Profile.png');

//#endregion

export const LocalStorage = {
  AccessToken: 'AccessToken'
}

export const APPSTRING = {
  App_Name: 'BME India'
}


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
  // userTypes.SERVICE_PROVIDER,
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

export const otpPurpose = {
  SIGN_UP: 'Sign Up',
  FORGOT_PWD: 'Forgot Password',
}

export const blogStatus = {
  INCOMPLETE: 1,
  APPROVED: 2,
  PUBLISHED: 3,
  UNPUBLISHED: 4,
}

export const blogStatusLabels = {
  1: 'incomplete',
  2: 'approved',
  3: 'published',
  4: 'unpublished',
}

export const subscriptionPlanPeriods = {
  MONTHLY: 1,
  QUARTERLY: 3,
  HALF_YEARLY: 6,
  YEARLY: 12,
}

export const sortOrder = {
  ASC_ORDER: 1,
  DESC_ORDER: -1,
}

export const pageConfigs = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  DEFAULT_SORT_ORDER: 1,
  DEFAULT_SORT_KEY: 'updatedAt',
}

export const categoryTypes = {
  Pharmaceuticals: 'Pharmaceuticals',
  Biomedical_Test_Equipment: 'Biomedical Test Equipment',
  Medical_Devices: 'Medical Devices',
  Biotechnology: 'Biotechnology',
  Research_and_Development: 'Research and Development (R&D)',
  Diagnostic_Laboratories: 'Diagnostic Laboratories',
  Biomedical_Imaging: 'Biomedical Imaging',
  Pharmaceuticals_Distribution: 'Pharmaceuticals Distribution',
  Clinical_Research: 'Clinical Research',
  Regulatory_Affairs: 'Regulatory Affairs',
  Healthcare_Information_Technology: 'Healthcare Information Technology (HealthTech)',
  Biomedical_Consulting: 'Biomedical Consulting',
  Contract_Research_Organizations: 'Contract Research Organizations (CROs)',
  Biomedical_Manufacturing: 'Biomedical Manufacturing',
  Pharmaceuticals_Marketing_and_Sales: 'Pharmaceuticals Marketing and Sales',
  Biomedical_Ethics_and_Compliance: 'Biomedical Ethics and Compliance',
  Biomedical_Education_and_Training: 'Biomedical Education and Training',
  Biomedical_Waste_Management: 'Biomedical Waste Management',
};



//#endregion
