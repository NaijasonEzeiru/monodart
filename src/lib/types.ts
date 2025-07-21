export type dataCollected = {
  location: boolean | null;
  personalInfo: boolean | null;
  paymentInfo: boolean | null;
  deviceInfo: boolean | null;
  gps: boolean | null;
  phot: boolean | null;
  biometric: boolean | null;
  contacts: boolean | null;
};

export type screenshots = {
  screenshot1: string | null;
  screenshot2: string | null;
  screenshot3: string | null;
  screenshot4: string | null;
}[];

export type appData = {
  appName: null | string;
  appPassword: null | string;
  appuserName: null | string;
  apkUrl: null | string;
  appDescription: null | string;
  appLogo: null | string;
  appPrivacyPolicy: null | string;
  copyright: null | string;
  appVersion: null | string;
  whatsNew: null | string;
  rating: null | string;
  appCat: null | string;
  appType: null | string;
  // screenshots: screenshots;
};
