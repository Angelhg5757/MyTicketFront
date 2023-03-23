import React, { useState, useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import './Dashboard.css';


export default function UpdateUsuarios() {
  let navigate = useNavigate();
  const [email, setCorreo] = useState('');
  const [password, setContrasenia] = useState('');
  const [registro, setRegistro] = useState('');
  const [vigencia, setVigencia] = useState('');
  const [rol, setRol] = useState('');
  const [ID, setID] = useState(null);

  const sendDataToAPI = () => {
    swal({
      title: "Usuario actualizado con éxito!",
      text: "El usuario " + email + " ha sido guardado",
      icon: "success",
      button: "Aceptar"
    }).then(actualiza => {
      if (actualiza) {
        axios.put(`http://localhost:9596/administrador/usuario/${ID}`, {
            correo: email,
            contrasenia: password,
            estatus: true,
            fechaRegistro: registro,
            fechaVigencia: vigencia,
            rol_id: rol

        }).then(() => {
          navigate("/CRUDUsuarios");
        })
      }
    })
  }

  useEffect(() => {
    setCorreo(localStorage.getItem('correo'));
    setRegistro(localStorage.getItem('registro'));
    setVigencia(localStorage.getItem('vigencia'));
    //setRol(localStorage.getItem('rol_id'));
    setID(localStorage.getItem('ID'));
  }, [])

  return (
    <div className='actualiza'>
      <div className='formula2'>
        <h1 className='actu'>Actualizar</h1>
        <Form>
          <Form.Field>
            <label>Correo electronico</label>
            <input className='inN' name="fname"
              value={email}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder='Nombre' required/>
          </Form.Field>
          <Form.Field>
            <label>Contraseña</label>
            <input className='inN'
                type="password"
              name="lname"
              value={password}
              placeholder='Contraseña'
              onChange={(e) => setContrasenia(e.target.value)} required
            />
          </Form.Field>
          <Form.Field>
            <label>Fecha de registro</label>
            <input className='inN'
                type="date"
              name="lname"
              value={registro}
              placeholder='Registro'
              onChange={(e) => setRegistro(e.target.value)} required
            />
          </Form.Field>
          <Form.Field>
            <label>Fecha de vigencia</label>
            <input className='inN'
                type="date"
              name="lname"
              value={vigencia}
              placeholder='Vigencia'
              onChange={(e) => setVigencia(e.target.value)} required
            />
          </Form.Field>
          <Form.Field>
            <label>Rol Id</label>
            <input className='inN'
              name="lrol"
              value={rol}
              placeholder='Rol Id'
              onChange={(e) => setRol(e.target.value)} required
            />
          </Form.Field>
          <Button className='regi1' type='submit' onClick={sendDataToAPI}>Actualizar</Button>
          <Link to='/CRUDUsuarios'>
            <Button className='cancela'>Cancelar</Button>
          </Link>
        </Form>
      </div>
    </div>
  )
}