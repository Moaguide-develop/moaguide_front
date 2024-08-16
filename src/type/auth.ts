export interface SendCodeResponse {
    success: boolean;
};
  
export interface VerifyCodeResponse {
    success: boolean;
};


export interface AuthHeaders {
    cookie: string;
    authorization: string;
};
  
export interface NicknameCheckResponse {
    Message: string;
};
  