using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project_YourInterviewBuddy.com.Models;
using Project_YourInterviewBuddy.com.OTPService;

namespace Project_YourInterviewBuddy.com.Controllers
{
    [Route("api/otp")]
    [ApiController]
    public class OTPController : ControllerBase
    {
        private readonly IOTPService _otpService;

        public OTPController(IOTPService otpService)
        {
            _otpService = otpService;
        }

        // Endpoint to generate OTP and send it to email
        [HttpPost("generate")]
        public async Task<IActionResult> GenerateOtp([FromBody] string email)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                return BadRequest("Email is required.");
            }

            // Generate OTP
            string otp = _otpService.GenerateOTP();

            // Save OTP to cache
            _otpService.SaveOtpToCache(email, otp);

            // Send OTP to user's email
            await _otpService.SendOtpEmailAsync(email, otp);

            return Ok("OTP sent to your email.");
        }

        // Endpoint to verify OTP
        [HttpPost("verify")]
        public IActionResult VerifyOtp([FromBody] VerifyOtpRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Otp))
            {
                return BadRequest("Email and OTP are required.");
            }

            bool isValid = _otpService.VerifyOtp(request.Email, request.Otp);

            if (isValid)
            {
                return Ok("OTP verified successfully.");
            }

            return Unauthorized("Invalid OTP.");
        }
    }
}
