using System;
using System.ComponentModel.DataAnnotations;

namespace ATS.Api.DTO
{
    public class JobCreateDTO
    {
        [Required(ErrorMessage = "O campo 'Title' é obrigatório!")]
        [MinLength(10, ErrorMessage = "O campo 'Title' deve conter no mínimo 10 caracteres!")]
        [StringLength(100, ErrorMessage = "O campo 'Title' não deve conter mais de 100 caracteres!")]
        public string Title { get; set; }

        [Required(ErrorMessage = "O campo 'Description' é obrigatório!")]
        [MinLength(10, ErrorMessage = "O campo 'Description' deve conter no mínimo 10 caracteres!")]
        [StringLength(500, ErrorMessage = "O campo 'Description' não deve conter mais de 500 caracteres!")]
        public string Description { get; set; }

        [Required(ErrorMessage = "O campo 'Responsibilities' é obrigatório!")]
        [MinLength(10, ErrorMessage = "O campo 'Responsibilities' deve conter no mínimo 10 caracteres!")]
        [StringLength(500, ErrorMessage = "O campo 'Responsibilities' não deve conter mais de 500 caracteres!")]
        public string Responsibilities { get; set; }

        [StringLength(500, ErrorMessage = "O campo 'AdditionalInformations' não deve conter mais de 500 caracteres!")]
        public string AdditionalInformations { get; set; }

        public DateTime CreatedDate { get; set; }
    }
}
