import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUsers, FaUser, FaStickyNote} from 'react-icons/fa';
import {SlEnvolopeLetter} from 'react-icons/sl';
import './Slidebar.css';

const SlideBar = () => {
    return (
        <div className='slidebar1'>
            <ul>
                <li>
                    <NavLink to="/admin"  className='text-light rounded py-3 my-3 w-100 d-inline-block px-3 text-center' style={{ 'fontSize': '15px', 'height':'50px' }}  activeclassname='active'><SlEnvolopeLetter className='me-2' color="white" /> Roles</NavLink>
                </li>
                <li>
                    <NavLink to="/CRUDusuarios" className='text-light rounded py-2 my-3  w-100 d-inline-block px-3 text-center'style={{ 'fontSize': '15px', 'height':'50px' }} activeclassname='active'><FaUsers className='me-2' color="white" /> Usuarios</NavLink>
                </li>
                {/* <li>
                    <NavLink to="/Dashboard/administrador" className='text-light rounded py-2 my-3 w-100 d-inline-block px-3 text-center' style={{ 'fontSize': '15px', 'height':'50px' }} activeclassname='active'><FaUser className='me-2' color="white" />Administrador</NavLink>
                </li>
                <li>
                    <NavLink to="/Dashboard/comentarios" className='text-light rounded py-2 my-3 w-100 d-inline-block px-3 text-center' style={{ 'fontSize': '15px', 'height':'50px' }} activeclassname='active'><FaStickyNote className='me-2' color="white" />Comentarios</NavLink>
                </li> */}
            </ul>
        </div>
    );
};

export default SlideBar;