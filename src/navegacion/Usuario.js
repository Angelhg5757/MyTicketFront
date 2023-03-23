import {Link, Outlet} from 'react-router-dom'

const Usuario = ({usuarios}) => {
    return (
        <>
            <h4>Página Usuarios</h4>
            <ul>
                {usuarios.map(
                    (usuario) => (
                        <li key={usuario.id}>
                            <Link to={`/usuario/${usuario.id}`} >
                                {usuario.nombre}
                            </Link>
                        </li>
                    )
                )}
            </ul>
            <Outlet />
        </>
    );
};

export default Usuario;