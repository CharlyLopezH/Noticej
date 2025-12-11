using FluentValidation;
using NoticeAPI.DTOs;

namespace NoticeAPI.Validaciones
{
    public class CrearNotificacionDTOValidador: AbstractValidator<CrearNotifcacionDTO>
    {
        public CrearNotificacionDTOValidador()
        {
            RuleFor(x=> x.OficioMemo)
                .NotEmpty().WithMessage("El campo {PropertyName} es obligatorio.")                
                .MaximumLength(15).WithMessage("El campo Oficio/Memo no puede exceder de 15 caracteres.")
                .MinimumLength(1).WithMessage("El campo Oficio/Memo dede conformarse de por lo menos de 1 caracter."); 
        }
    }
}
