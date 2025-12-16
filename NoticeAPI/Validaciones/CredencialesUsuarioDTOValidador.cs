using FluentValidation;
using NoticeAPI.DTOs;

namespace NoticeAPI.Validaciones
{
    public class CredencialesUsuarioDTOValidador: AbstractValidator<CredencialesUsuarioDTO>
    {
        public CredencialesUsuarioDTOValidador()
        {
            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("El email es obligatorio.")
                .MaximumLength(100).WithMessage("El {PropertyName} no puede exceder de {MaxLength} caracteres.")
                .EmailAddress().WithMessage(Utilidades.EmailMensaje);
            RuleFor(x => x.Password)
                .NotEmpty().WithMessage(Utilidades.CampoRequeridoMensaje)
                .MinimumLength(6).WithMessage("La contraseña debe tener al menos 6 caracteres.");
        }
    }
}
