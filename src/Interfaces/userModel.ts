export default interface userModel{
    email:string;
    password:string;
    verificationToken?:string;
    isVerified?:boolean;
    resetPasswordToken?:string;
    resetPasswordTokenExpiresAt?:string
}