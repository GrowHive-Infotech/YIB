using MailKit.Security;
using Microsoft.Extensions.Caching.Memory;
using MimeKit;
using System.Net.Mail;
using MailKit.Net.Smtp;
using SmtpClient = MailKit.Net.Smtp.SmtpClient;

namespace Project_YourInterviewBuddy.com.OTPService
{
    public class OTPService: IOTPService
    {
        private readonly IMemoryCache _memoryCache;
        private readonly string _smtpServer = "smtp.gmail.com";
        private readonly int _smtpPort = 587;
        private readonly string _smtpUsername = "support@yourinterviewbuddy.com";
        private readonly string _smtpPassword = "aayush1234@A";

        public OTPService(IMemoryCache memoryCache)
        {
            _memoryCache = memoryCache;
        }

        // Generate OTP
        public string GenerateOTP()
        {
            Random random = new Random();
            string otp = random.Next(100000, 999999).ToString();  // 6-digit OTP
            return otp;
        }

        // Send OTP to user email
        public async Task SendOtpEmailAsync(string email, string otp)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("YourInterviewBuddy", _smtpUsername));
            message.To.Add(new MailboxAddress("", email));
            message.Subject = "Your OTP Code";

            var bodyBuilder = new BodyBuilder
            {
                TextBody = $"Your OTP code is: {otp}"
            };
            message.Body = bodyBuilder.ToMessageBody();

            using (var client = new SmtpClient())
            {
                await client.ConnectAsync("smtpout.secureserver.net", 587, MailKit.Security.SecureSocketOptions.StartTls);

                // Use App Password here if 2FA is enabled
                await client.AuthenticateAsync(_smtpUsername, "aayush1234@A");  // Replace with your Gmail address and app password

                await client.SendAsync(message);
                await client.DisconnectAsync(true);
            }
        }

        // Save OTP to cache
        public void SaveOtpToCache(string email, string otp)
        {
            var cacheEntryOptions = new MemoryCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromMinutes(5));  // OTP expires in 5 minutes

            _memoryCache.Set(email, otp, cacheEntryOptions);
        }

        // Verify OTP
        public bool VerifyOtp(string email, string otp)
        {
            if (_memoryCache.TryGetValue(email, out string storedOtp))
            {
                return storedOtp == otp;
            }
            return false;
        }
    }
}
