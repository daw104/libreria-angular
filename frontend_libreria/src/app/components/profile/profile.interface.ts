export interface Response {
  access_token: string;
  token_type:   string;
  expires_in:   number;
  user:         User;
}

export interface User {
  created_at: string;
  email:string;
  email_verified_at:string;
  id : number;
  name:string;
  updated_at:string;
}
