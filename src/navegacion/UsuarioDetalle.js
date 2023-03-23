import { Link, useParams } from 'react-router-dom';

const UsuarioDetalle = () => {
    const { usuarioId } = useParams();
    return (
        <>
            <h3>Usuario {usuarioId}</h3>
            <Link to={'/usuario'} >Regresar a lista de usuarios</Link>
        </>
    );
};

export default UsuarioDetalle;