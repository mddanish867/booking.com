export default interface apiResponse {
  data?: {
    // this will give suggestion
    statusCode?: number;
    isSuccess?: boolean;
    jwtToken?: Array<string>;
    errorMessage?: Array<string>;
    result: {
      // this will not give suggestions
      [key: string]: string;
    };
  };
  error?: any;
}
