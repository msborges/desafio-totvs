using ATS.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ATS.Api
{
    public class ATSContext : DbContext
    {
        public ATSContext(DbContextOptions<ATSContext> options) : base(options)
        {

        }

        public DbSet<Candidate> Candidates { get; set; }
        public DbSet<Job> Jobs { get; set; }
    }
}
