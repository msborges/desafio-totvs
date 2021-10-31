using ATS.Api.DTO;
using ATS.Api.Models;
using AutoMapper;

namespace ATS.Api.Profiles
{
    public class JobProfile : Profile
    {
        public JobProfile()
        {
            CreateMap<Job, JobReadDTO>();
            CreateMap<JobCreateDTO, Job>();
            CreateMap<JobUpdateDTO, Job>();
        }
    }
}
