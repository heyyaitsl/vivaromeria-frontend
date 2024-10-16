import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, Ticket, LogOut, Truck, MapPin } from 'lucide-react';
import { useAuth } from '../../AuthContext';

export function IconBox({closeMenu}) {
  const { logOut } = useAuth();
    const role = localStorage.getItem('role');
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    window.location.href = '/login';
    logOut();
  };

  return (
    <div className="icon-box">
      <ul>
        
          {role === 'ROLE_FLOATS' &&(<>
        <li>
          <Link to="/manage-floats" onClick={closeMenu}>
            <Truck className="icon-box-icon" />
            Gestionar Carrozas
          </Link>
        </li></>)}
        {role === 'ROLE_ADMIN' &&(<>
        <li>
          <Link to="/manage-pilgrimages" onClick={closeMenu}>
            <MapPin className="icon-box-icon" />
            Gestionar Romerías
          </Link>
        </li></>)}
        <li>
            <Link to="/" onClick={closeMenu}>
            <Settings className="icon-box-icon" />
            Configuración
          </Link>
        </li>
        <li>
        <Link to="/" onClick={closeMenu}>
            <Ticket className="icon-box-icon" />
            Ver entradas
          </Link>
        </li>
        <li>
          <button onClick={logout}>
            <LogOut className="icon-box-icon" />
            Cerrar sesión
          </button>
        </li>
      </ul>
    </div>
  );
}