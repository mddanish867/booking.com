export default interface apiResponse {
  data?: {
    status?: number;
    isSuccess?: boolean;
    jwtToken?: string;
    errorMessage?: Array<string>;
    user_id?: string;
    images?:[string]; // Add message property
    response: {
      [key: string]: string;
    };
  };
  error?: any
}
