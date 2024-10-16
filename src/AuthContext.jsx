import React, { createContext, useContext, useEffect, useState } from 'react';

// Crea el contexto
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false); // Estado de autenticación

    const logIn = () => {
        setIsLogged(true);
        localStorage.setItem('isLogged', 'true'); 
      };
    const logOut = () => {
        setIsLogged(false);
        localStorage.removeItem('isLogged'); // Eliminar del localStorage
      };

    useEffect(() => {
        const savedLoggedState = localStorage.getItem('isLogged');
        if (savedLoggedState === 'true') {
          setIsLogged(true);
        }
      }, []);

    return (
        <AuthContext.Provider value={{ isLogged, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para usar el contexto
export const useAuth = () => useContext(AuthContext);