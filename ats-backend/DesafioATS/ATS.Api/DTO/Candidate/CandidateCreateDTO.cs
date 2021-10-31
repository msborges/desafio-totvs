using System;
using System.ComponentModel.DataAnnotations;

namespace ATS.Api.DTO
{
    public class CandidateCreateDTO
    {
        [Required(ErrorMessage = "O campo 'FirstName' é obrigatório!")]
        [MinLength(3, ErrorMessage = "O campo 'FirstName' deve conter no mínimo 3 caracteres!")]
        [StringLength(20, ErrorMessage = "O campo 'FirstName' não deve conter mais de 20 caracteres!")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "O campo 'LastName' é obrigatório!")]
        [MinLength(3, ErrorMessage = "O campo 'LastName' deve conter no mínimo 3 caracteres!")]
        [StringLength(40, ErrorMessage = "O campo 'LastName' não deve conter mais de 40 caracteres!")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "O campo 'Email' é obrigatório!")]
        [EmailAddress(ErrorMessage = "Endereço de e-mail inválido!")]
        [StringLength(100, ErrorMessage = "O campo 'Email' não deve conter mais de 100 caracteres!")]
        public string Email { get; set; }

        [Required(ErrorMessage = "O campo 'Cpf' é obrigatório!")]
        [MinLength(11, ErrorMessage = "O campo 'Cpf' deve conter no mínimo 11 caracteres!")]
        public string Cpf { get; set; }

        [Required(ErrorMessage = "O campo 'PhoneNumber' é obrigatório!")]
        [MinLength(14, ErrorMessage = "O campo 'PhoneNumber' deve conter no mínimo 14 caracteres!")]
        public string PhoneNumber { get; set; }

        public DateTime CreatedDate { get; set; }
    }
}
