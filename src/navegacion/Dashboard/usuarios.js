import './Dashboard.css';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import swal from 'sweetalert';
import NavbarDashboard from './NavBar';
import SlideBar from './Slidebar';

const Usuarios = () => {
    /* ------------Usuarios--------------------------------*/

    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:9596/administrador/usuario/listar`)
            .then((getData) => {
                setApiData(getData.data);
            })
    }, [])

    const setData = (id, correo, contrasenia, estatus, fechaRegistro, fechaVigencia, rol_id) => {
        localStorage.setItem('ID', id)
        localStorage.setItem('correo', correo)
        localStorage.setItem('contrasenia', contrasenia)
        localStorage.setItem('estatus', estatus)
        localStorage.setItem('fechaRegistro', fechaRegistro)
        localStorage.setItem('fechaVigencia', fechaVigencia)
        localStorage.setItem('rol_id', rol_id)
    }

    const getData = () => {
        axios.get(`http://localhost:9596/administrador/usuario/listar`)
            .then((getData) => {
                setApiData(getData.data);
            })
    }

    const onDelete = (id) => {
        swal({
            title: "Eliminar usuario",
            text: "¿Está seguro que desea eliminar el usuario?",
            icon: "warning",
            buttons: ["No", "Si"]
        }).then(elimina => {
            if (elimina) {
                axios.delete(`http://localhost:9596/administrador/usuario/${id}`)
                    .then(() => {
                        getData();
                    })
                swal({
                    text: "El usuario ha sido eliminado con éxito",
                    icon: "success"
                })
            }
        })
    }

    const [email, setCorreo] = useState();
    const [password, setContrasenia] = useState();
    const [registro, setRegistro] = useState();
    const [vigencia, setVigencia] = useState();
    const [rol, setRol] = useState();

    let registerUsu = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch(
                'http://localhost:9596/administrador/registrar', {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    "content-type": "application/json",

                },
                body: JSON.stringify({
                    correo: email,
                    contrasenia: password,
                    estatus: true,
                    fechaRegistro: registro,
                    fechaVigencia: vigencia,
                    rol_id: rol
                })
            }
            );
            swal({
                title: "Usuario registrado con éxito!",
                text: "El usuario " + email + " ha sido guardado",
                icon: "success",
                button: "Aceptar"
            }).then(respuesta => {
                if (respuesta) {
                    window.location.reload();
                }
            })
            // alert("El usuario: " + email + " fue registrado con éxito");
        } catch (error) {
            // console.log(error);
            swal({
                title: "Error",
                text: "Ocurrio un error al guardar :(",
                icon: "error",
                button: "Aceptar"
            });
        }
    }

    return (
        <>
            {/* <div className='Users'>
                <div className="slidebar2">
                    <div className="logo">
                        <a href=""></a>
                    </div>
                    <ul>
                         <li><a href="/admin#dashboard" id="targeted">dashboard</a></li> 
                        <li><a href="/admin">CRUD Roles</a></li>
                        <li><a href="/CRUDUsuarios">CRUD Usuarios</a></li>
                    </ul>
                </div> */}
                <NavbarDashboard/>
                <SlideBar/>
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                        <br/><br/>
                        <h3 className="header1 text-center">CRUD Usuarios</h3>
                        <div className='usuarios'>
                            <form method="POST" className='text-center' onSubmit={registerUsu}>
                                <div className>
                                    <label for="" className="etiqueta">Correo electronico</label>
                                    <input type="email" className="inN" onChange={e => setCorreo(e.target.value)} required/>
                                </div>

                                <div className>
                                    <label for="" className="etiqueta">Contraseña</label>
                                    <input type="password" className="inN" onChange={e => setContrasenia(e.target.value)} required/>
                                </div>

                                <div className>
                                    <label for="" className="etiqueta">Fecha de registro</label>
                                    <input type="date" className="inN" onChange={e => setRegistro(e.target.value)} required/>
                                </div>

                                <div className>
                                    <label for="" className="etiqueta">Fecha de vigencia</label>
                                    <input type="date" className="inN" onChange={e => setVigencia(e.target.value)} required/>
                                </div>

                                <div className>
                                    <label for="" className="etiqueta">Rol Id</label>
                                    <input type="text" className="inN" onChange={e => setRol(e.target.value)} required/>
                                </div>
                                <input type="submit" className="regi" value="Crear" />
                            </form>
                            <br></br>
                        </div>
                    </div>
                    <div className='col-8'> 
                        
                    <div className="tab2">
                        <br/><br/>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>ID</TableCell>
                                                <TableCell>Correo</TableCell>
                                                {/* <TableCell>Contraseña</TableCell> */}
                                                {/* <TableCell>Estatus</TableCell> */}
                                                <TableCell>Fecha de registro</TableCell>
                                                <TableCell>Fecha de vigencia</TableCell>
                                                <TableCell>Rol Id</TableCell>
                                                <TableCell>Actualizar</TableCell>
                                                <TableCell>Eliminar</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {apiData.map((data) => {
                                                return (
                                                    <TableRow>
                                                        <TableCell>{data.id}</TableCell>
                                                        <TableCell>{data.correo}</TableCell>
                                                        {/* <TableCell>{data.contrasenia}</TableCell> */}
                                                        {/* <TableCell>{data.estatus}</TableCell> */}
                                                        <TableCell>{data.fechaRegistro}</TableCell>
                                                        <TableCell>{data.fechaVigencia}</TableCell>
                                                        <TableCell>{data.rol.nombre}</TableCell>
                                                        <TableCell>
                                                            <Link to='/updateUser'>
                                                                <Button
                                                                    className='edi'
                                                                    onClick={() => setData(data.id, data.correo, data.contrasenia, data.fechaRegistro, data.fechaVigencia, data.rol_id)}>
                                                                    <FontAwesomeIcon icon={faEdit} />
                                                                </Button>
                                                            </Link>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button className='del'  onClick={() => onDelete(data.id)}><FontAwesomeIcon icon={faTrashAlt} /></Button>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                    </div>
                </div>
                <div className="main2">

                    <div id="media">
                        
                        </div>
                    </div>
                </div>
        </>
    );
};

export default Usuarios;