export interface SendCodeResponse {
    success: boolean;
}
  
export interface VerifyCodeResponse {
    success: boolean;
}


export interface AuthHeaders {
    cookie: string;
    Verify: string;
}
  
export interface NicknameCheckResponse {
    Message: string;
}