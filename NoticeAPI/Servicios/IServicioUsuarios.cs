using Microsoft.AspNetCore.Identity;

namespace NoticeAPI.Servicios
{
    public interface IServicioUsuarios
    {
        Task<IdentityUser?> ObtenerUsuario();
    }
}