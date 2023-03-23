import React, { useState, useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import './Dashboard.css';


export default function Update() {
  let navigate = useNavigate();
  const [Nombre, setNombre] = useState('');
  const [Descripcion, setDescripcion] = useState('');
  const [ID, setID] = useState(null);
  const sendDataToAPI = () => {
    swal({
      title: "Rol actualizado con éxito!",
      text: "El rol " + Nombre + " ha sido guardado",
      icon: "success",
      button: "Aceptar"
    }).then(actualiza => {
      if (actualiza) {
        axios.put(`http://localhost:9596/administrador/rol/${ID}`, {
          nombre: Nombre,
          descripcion: Descripcion
        }).then(() => {
          navigate("/admin");
        })
      }
    })
  }

  useEffect(() => {
    setNombre(localStorage.getItem('nombre'));
    setDescripcion(localStorage.getItem('descripcion'));
    setID(localStorage.getItem('ID'))
  }, [])

  return (
    <div className='actualiza'>
      <div className='formula2'>
        <h1 className='actu'>Actualizar</h1>
        <Form>
          <Form.Field>
            <label>Nombre</label>
            <input className='inN' name="fname"
              value={Nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder='Nombre' required/>
          </Form.Field>
          <Form.Field>
            <label>Descripcion</label>
            <input className='inN'
              name="lname"
              value={Descripcion}
              placeholder='Descripcion'
              onChange={(e) => setDescripcion(e.target.value)} required
            />
          </Form.Field>
          <Button className='regi1' type='submit' onClick={sendDataToAPI}>Actualizar</Button>
          <Link to='/admin#posts'>
            <Button className='cancela'>Cancelar</Button>
          </Link>
        </Form>
      </div>
    </div>
  )
}