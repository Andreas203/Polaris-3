using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Polaris.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CompaniesController : ControllerBase
    {
        private static readonly string[] Symbols = new[]
        {
            "MSFT", "APPL", "AMZN", "FB", "GOOGL", "NVDA"
        };

        private static readonly string[] Names = new[]
{
            "Microsoft", "Apple", "Amazon", "Facebook", "Google", "Nvidia"
        };

        private static readonly double[] Past = new[]
        {
            1.1,2,3,4,5,6,7,8,9,10,12
        };

        private static readonly double[] Predictions = new[]
{
            1.1,2.2,3.3,4.4,5.5
        };

        private readonly ILogger<CompaniesController> _logger;

        public CompaniesController(ILogger<CompaniesController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Companies> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new Companies
            {
                Symbol = Names[rng.Next(Names.Length)],
                Name = Names[rng.Next(Names.Length)],
                Past = Past,
                Predictions = Predictions
            });
        }
    }
}
