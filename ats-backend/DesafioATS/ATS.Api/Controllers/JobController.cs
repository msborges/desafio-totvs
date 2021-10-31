using ATS.Api.DTO;
using ATS.Api.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Linq;

namespace ATS.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class JobController : ControllerBase
    {
        private ATSContext _context;
        private IMapper _automapper;

        private readonly ILogger<JobController> _logger;

        public JobController(ATSContext context, IMapper mapper, ILogger<JobController> logger)
        {
            _context = context;
            _automapper = mapper;
            _logger = logger;
        }

        [HttpGet]
        public IActionResult GetJobs()
        {
            return Ok(_context.Jobs);
        }

        [HttpGet("{id}")]
        public IActionResult GetJobByID(int id)
        {
            Job job = _context.Jobs.FirstOrDefault(job => job.Id == id);
            if (job != null)
            {
                JobReadDTO jobDTO = _automapper.Map<JobReadDTO>(job);

                return Ok(jobDTO);
            }
            return NotFound();
        }

        [HttpPost]
        public IActionResult InsertJob([FromBody] JobCreateDTO jobDTO)
        {
            Job job = _automapper.Map<Job>(jobDTO);

            _context.Jobs.Add(job);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetJobByID), new { job.Id }, job);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateJob(int id, [FromBody] JobUpdateDTO jobDTO)
        {
            Job job = _context.Jobs.FirstOrDefault(job => job.Id == id);
            if (job != null)
            {
                _automapper.Map(jobDTO, job);
                _context.SaveChanges();
                return NoContent();
            }
            return NotFound();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteJob(int id)
        {
            Job job = _context.Jobs.FirstOrDefault(job => job.Id == id);
            if (job != null)
            {
                _context.Remove(job);
                _context.SaveChanges();
                return NoContent();
            }
            return NotFound();
        }
    }
}
