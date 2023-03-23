import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Sidebar2 from "./Sidebar2";
import swal from "sweetalert";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Comunidad = () => {
    const [data, setApiData] = useState([]);
    let navigate = useNavigate();
    const [id, setId] = useState('');

    useEffect(() => {
        setId(localStorage.getItem('idUsuario'));
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:4000/publicacion/listar`)
            .then((getData) => {
                setApiData(getData.data);
            })
    }, [])

    const getData = () => {
        axios.get(`http://localhost:4000/publicacion/listar`)
            .then((getData) => {
                setApiData(getData.data);
            })
    }

    const getData2 = () => {
        axios.get(`http://localhost:4000/usuario/listar`)
            .then((getData) => {
                setApiData(getData.data);
            })
    }


    const onContacto = (idPublicaciones, telefono, correoPublico) => {
        const idUser = localStorage.getItem('idUsuario');
        const tel = telefono;
        const correo = correoPublico;
        swal({
            title: "Contactar al usuario",
            text: "¿Está seguro que desea contactar al usuario de esta publicación?",
            icon: "warning",
            buttons: ["No", "Si"]
        }).then(contacta => {
            if (contacta) {
                axios.put(`http://localhost:4000/publicacion/actualizar/${idPublicaciones}`)
                    .then(() => {
                        getData();
                    })
                axios.put(`http://localhost:4000/usuario/actualizarStatus/${idUser}`)
                    .then(() => {
                        getData2();
                    })
                swal({
                    title: "Ha establecido contacto. Gracias!",
                    text: "El telefono del usuario es: " + tel + "\n" + "El correo del usuario es: " + correo,
                    icon: "success",
                    button: "Aceptar"
                }).then(acepta => {
                    if (acepta) {
                        window.location.reload();
                    }

                })

            }
        })
    }

    if (id == null) {
        navigate("*");
    }

    // const sendDataToAPI = () => {
    //     swal({
    //       title: "Ha establecido contacto",
    //       text: "Usted está apunto de ayudar a una persona",
    //       icon: "success",
    //       button: "Aceptar"
    //     }).then(actualiza => {
    //       if (actualiza) {
    //         axios.put(`http://localhost:9596/administrador/usuario/${ID}`, {
    //             correo: email,
    //             contrasenia: password,
    //             estatus: true,
    //             fechaRegistro: registro,
    //             fechaVigencia: vigencia,
    //             rol_id: rol

    //         }).then(() => {
    //           navigate("/CRUDUsuarios");
    //         })
    //       }
    //     })
    //   }

    //   useEffect(() => {
    //     setCorreo(localStorage.getItem('correo'));
    //     setRegistro(localStorage.getItem('registro'));
    //     setVigencia(localStorage.getItem('vigencia'));
    //     //setRol(localStorage.getItem('rol_id'));
    //     setID(localStorage.getItem('ID'));
    //   }, [])

    return (
        <>
            <Sidebar2 />
            <div className="container">
                <div className="row">
                    <div className="col-5">
                    </div>
                    <div className="col-6" >
                        {data.map((item, index) => (
                            <Card sx={{ maxWidth: 345, backgroundColor: "#212121", color: "#fafafa", marginBottom: "15px" }} key={index}>
                                <CardMedia
                                    component="img"
                                    // alt="green iguana"
                                    height="140"
                                    image="https://img.freepik.com/vector-premium/mujer-acostada-cama-hospital-ilustracion-personajes-dibujos-animados-personas-sobre-fondo-blanco-joven-que-padece-enfermedad-imagen-sala-electrocardiografo-tema-medico-sanitario_89615-1063.jpg?w=2000"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {item.titulo}
                                    </Typography>
                                    <Typography sx={{ color: "#fafafa" }} variant="h6" color="text.secondary">
                                        {item.nombre}{' '}{item.apePat}{' '}{item.apeMat}{' '}
                                    </Typography>
                                    <Typography sx={{ color: "fafafa" }} variant="body2" color="text.secondary">
                                        {'Tipo de Sangre: '}{' '}{item.tipo}
                                    </Typography>
                                    <Typography sx={{ color: "#fafafa" }} variant="body1" color="text.secondary">
                                        {item.descripcion}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button variant="contained" size="medium" type="submit" onClick={() => onContacto(item.idPublicaciones, item.telefono, item.correoPublico)}>Contactar</Button>
                                </CardActions>
                            </Card>
                        ))}
                    </div>

                </div>
            </div>
        </>
    )
}

export default Comunidad;