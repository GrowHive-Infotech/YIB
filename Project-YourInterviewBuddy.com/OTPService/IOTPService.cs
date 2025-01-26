namespace Project_YourInterviewBuddy.com.OTPService
{
    public interface IOTPService
    {
        public Task SendOtpEmailAsync(string email, string otp);

        public string GenerateOTP();

        public void SaveOtpToCache(string email, string otp);

        public bool VerifyOtp(string email, string otp);


    }
}
