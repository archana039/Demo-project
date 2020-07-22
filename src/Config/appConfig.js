export const ENVEnum: any = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
};

export const Environment = process.env.NODE_ENV || ENVEnum.DEVELOPMENT;
export const API_ENDPOINT  = 'http://flowhaus.club/flowhaus/api/1.0';
export const SOCKET_ENDPOINT  = process.env.REACT_APP_SERVER_URL;
export const ImageURL  = process.env.REACT_APP_IMAGE_URL
export const GmailURL  = process.env.SERVER_URL
