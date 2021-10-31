using ATS.Api.DTO;
using ATS.Api.Models;
using AutoMapper;

namespace ATS.Api.Profiles
{
    public class CandidateProfile : Profile
    {
        public CandidateProfile()
        {
            CreateMap<Candidate, CandidateReadDTO>();
            CreateMap<CandidateCreateDTO, Candidate>();
            CreateMap<CandidateUpdateDTO, Candidate>();
        }
    }
}
