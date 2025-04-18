using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class SetupController : ControllerBase
{
    private readonly DbSetupService _setupService;

    public SetupController(DbSetupService setupService)
    {
        _setupService = setupService;
    }

    [HttpPost("run")]
    public async Task<IActionResult> RunSetup()
    {
        await _setupService.RunCreateScriptsAsync();
        return Ok("Tables created successfully.");
    }
}
