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
    public class CandidateController : ControllerBase
    {
        private ATSContext _context;
        private IMapper _automapper;

        private readonly ILogger<CandidateController> _logger;

        public CandidateController(ATSContext context, IMapper mapper, ILogger<CandidateController> logger)
        {
            _context = context;
            _automapper = mapper;
            _logger = logger;
        }

        [HttpGet]
        public IActionResult GetCandidates()
        {
            return Ok(_context.Candidates);
        }

        [HttpGet("{id}")]
        public IActionResult GetCandidateByID(int id)
        {
            Candidate candidate = _context.Candidates.FirstOrDefault(candidate => candidate.Id == id);
            if (candidate != null)
            {
                CandidateReadDTO candidateDTO = _automapper.Map<CandidateReadDTO>(candidate);

                return Ok(candidateDTO);
            }
            return NotFound();
        }

        [HttpPost]
        public IActionResult InsertCandidate([FromBody] CandidateCreateDTO candidateDTO)
        {
            Candidate candidate = _automapper.Map<Candidate>(candidateDTO);

            _context.Candidates.Add(candidate);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetCandidateByID), new { candidate.Id }, candidate);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateCandidate(int id, [FromBody] CandidateUpdateDTO candidateDTO)
        {
            Candidate candidate = _context.Candidates.FirstOrDefault(candidate => candidate.Id == id);
            if (candidate != null)
            {
                _automapper.Map(candidateDTO, candidate);
                _context.SaveChanges();
                return NoContent();
            }
            return NotFound();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteCandidate(int id)
        {
            Candidate candidate = _context.Candidates.FirstOrDefault(candidate => candidate.Id == id);
            if (candidate != null)
            {
                _context.Remove(candidate);
                _context.SaveChanges();
                return NoContent();
            }
            return NotFound();
        }
    }
}
