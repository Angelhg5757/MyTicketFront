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
import SlideBar from './Slidebar';
import NavbarDashboard from './NavBar';

const Dashboard = () => {
    const MostrarAlerta = () => {
        swal({
            title: "Rol registrado con éxito!",
            text: "El rol " + Nombre + " ha sido guardado",
            icon: "success",
            button: "Aceptar"
        }).then(respuesta => {
            if (respuesta) {
                window.location.reload();
            }
        })
    }

    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:9596/administrador/rol/listar`)
            .then((getData) => {
                setApiData(getData.data);
            })
    }, [])

    const setData = (id, nombre, descripcion, isCrear, isActualizar, isBorrar) => {
        localStorage.setItem('ID', id)
        localStorage.setItem('nombre', nombre)
        localStorage.setItem('descripcion', descripcion)
        localStorage.setItem('isCrear', isCrear)
        localStorage.setItem('isActualizar', isActualizar)
        localStorage.setItem('isBorrar', isBorrar)
    }

    const getData = () => {
        axios.get(`http://localhost:9596/administrador/rol/listar`)
            .then((getData) => {
                setApiData(getData.data);
            })
    }

    const onDelete = (id) => {
        swal({
            title: "Eliminar rol",
            text: "¿Está seguro que desea eliminar el rol?",
            icon: "warning",
            buttons: ["No", "Si"]
        }).then(elimina => {
            if (elimina) {
                axios.delete(`http://localhost:9596/administrador/rol/${id}`)
                    .then(() => {
                        getData();
                    })
                swal({
                    text: "El rol ha sido eliminado con éxito",
                    icon: "success"
                })
            }
        })
    }

    let navigate = useNavigate();
    const [Nombre, setNombre] = useState();
    const [Descripcion, setDescripcion] = useState();

    let register = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch(
                'http://localhost:9596/administrador/registrarRol', {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    "content-type": "application/json",

                },
                body: JSON.stringify({
                    nombre: Nombre,
                    descripcion: Descripcion,
                    isCrear: false,
                    isActualizar: false,
                    isBorrar: false
                })
            }
            );
            MostrarAlerta();
            // alert("El rol: " + Nombre + " fue registrado con éxito");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
           {/*  <div className="slidebar2">
                <div className="logo">
                    <a href=""></a>
                </div>
                <ul>
                    <li><a href="#dashboard" id="targeted">dashboard</a></li>
                    <li><a href="">CRUD Roles</a></li>
                    <li><a href="/CRUDUsuarios">CRUD Usuarios</a></li>
                    <li><a href="#pages">pages</a></li>
                    <li><a href="#links">links</a></li>
                    <li><a href="#comments">comments</a></li>
                    <li><a href="#widgets">widgets</a></li>
                    <li><a href="#plugins">plugins</a></li>
                    <li><a href="#users">users</a></li>
                    <li><a href="#tools">tools</a></li>
                    <li><a href="#settings">settings</a></li> 
                </ul>
            </div> */}
            <NavbarDashboard />
            <SlideBar/>
            <div className="main2">
                {/* <ul className="topbar clearfix">
                    <li><a href="#">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#"></a></li>
                    <li><a href="#"></a></li>
                </ul> */}
                {/* <div className="mainContent clearfix">
                    <div id="dashboard">
                        <h2 className="header"><span className="icon"></span>Dashboard</h2>
                        <div className="monitor">
                            <h4>Right Now</h4>
                            <div className="clearfix">
                                <ul className="content">
                                    <li>content</li>
                                    <li className="posts"><span className="count">179</span><a href="">posts</a></li>
                                    <li className="pages"><span className="count">13</span><a href="">pages</a></li>
                                    <li className="categories"><span className="count">21</span><a href="">categories</a></li>
                                    <li className="tags"><span className="count">305</span><a href="">tags</a></li>
                                </ul>
                                <ul className="discussions">
                                    <li>discussions</li>
                                    <li className="comments"><span className="count">353</span><a href="">comments</a></li>
                                    <li className="approved"><span className="count">319</span><a href="">approved</a></li>
                                    <li className="pending"><span className="count">0</span><a href="">pending</a></li>
                                    <li className="spam"><span className="count">34</span><a href="">spam</a></li>
                                </ul>
                            </div>
                            <p>Theme <a href="">Twenty Eleven</a> with <a href="">3 widgets</a></p>
                        </div>

                    </div> */}

                    <div className="container">
                        <div className="row">
                            <div className="col-4">
                                <br /><br />
                            <h2 className="header1 text-center">CRUD Roles</h2>
                        <div className='usuarios text-center'>
                            <form method="POST" className="formula3" onSubmit={register}>
                                <div className>
                                    <label for="" className="etiqueta">Nombre</label>
                                    <input type="text" className="inN" onChange={e => setNombre(e.target.value)} required/>
                                </div>

                                <div className>
                                    <label for="" className="etiqueta">Descripcion</label>
                                    <input type="text" className="inN" onChange={e => setDescripcion(e.target.value)} required/>
                                </div>
                                <input type="submit" className="regi" value="Crear" />
                            </form>
                            </div>    
                        </div>
                        <div className="col-8">
                        <div className="tab2">
                        <br /><br />
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>ID</TableCell>
                                                <TableCell>Nombre</TableCell>
                                                <TableCell>Descripcion</TableCell>
                                                <TableCell>Actualizar</TableCell>
                                                <TableCell>Eliminar</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {apiData.map((data) => {
                                                return (
                                                    <TableRow>
                                                        <TableCell>{data.id}</TableCell>
                                                        <TableCell>{data.nombre}</TableCell>
                                                        <TableCell>{data.descripcion}</TableCell>
                                                        <TableCell>
                                                            <Link to='/update'>
                                                                <Button
                                                                    className='edi'
                                                                    onClick={() => setData(data.id, data.nombre, data.descripcion)}>
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
                    <div id="media">
                        
                            <br></br>
                            
                        </div>
                    </div>

                    {/* <div id="pages">
                        <h2 className="header">pages</h2>
                    </div>
                    <div id="links">
                        <h2 className="header">links</h2>
                    </div>
                    <div id="comments">
                        <h2 className="header">comments</h2>
                    </div>
                    <div id="widgets">
                        <h2 className="header">widgets</h2>
                    </div>
                    <div id="plugins">
                        <h2 className="header">plugins</h2>
                    </div>
                    <div id="users">
                        <h2 className="header">users</h2>
                    </div>
                    <div id="tools">
                        <h2 className="header">tools</h2>
                    </div>
                    <div id="settings">
                        <h2 className="header">settings</h2>
                    </div> */}
                </div>
                {/* <ul className="statusbar">
                    <li><a href=""></a></li>
                    <li><a href=""></a></li>
                    <li className="profiles-setting"><a href="">1</a></li>
                    <li className="logout"><a href="">2</a></li>
                </ul> */}
            </div>
        // </div>
    );
};

export default Dashboard;
