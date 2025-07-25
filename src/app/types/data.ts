export type screenshots = {
  screenshot1: null | string;
  screenshot2: null | string;
  screenshot3: null | string;
  screenshot4: null | string;
  appName: string | null;
};

export type dataCollected = {
  location: boolean | null;
  personalInfo: boolean | null;
  paymentInfo: boolean | null;
  deviceInfo: boolean | null;
  gps: boolean | null;
  phot: boolean | null;
  biometric: boolean | null;
  contacts: boolean | null;
  appName: string | null;
};

export type App = {
  appName: string | null;
  appDescription: string | null;
  appLogo: string | null;
  appPrivacyPolicy: string | null;
  copyright: string | null;
  appVersion: string | null;
  whatsNew: string | null;
  rating: string | null;
  appCat: string | null;
  appType: string | null;
  appPassword: string | null;
  appuserName: string | null;
  status: string | null;
  apkUrl: string | null;
  createdAt: string | null;
};

type balance = {
  balance1: 0;
  balance2: 0;
  allTimeBalance: 0;
};

export type dataType = {
  appReviews: [] | null;
  balance: balance;
  appstoreUsers: number | null;
  userUid: string;
  accountType: string;
  profileStatus: boolean;
  firstName: string;
  lastName: string;
  userEmail: string;
  phoneNumber: string;
  newApp: App[];
  updateApp: App[];
  screenshots: screenshots[];
  dataCollected: dataCollected[];
  setting: {
    userEmail: string;
    // password: "$2b$10$3lJYC6dPOOTDkrwbx24eN.z/WEOOkwc6YMc0EMQvUKQvr6Y6DDPXa";
  };
}[];
