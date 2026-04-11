import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);

  const signup = (userData) => {
    if (users.some(user => user.email === userData.email)) {
      throw new Error('Email already exists');
    }

    const newUser = {
      id: Date.now(),
      ...userData,
      createdAt: new Date().toISOString()
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    return true;
  };

  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    setCurrentUser(user);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfile = (updatedData) => {
    if (!currentUser) return false;

    const updatedUsers = users.map(user =>
      user.id === currentUser.id ? { ...user, ...updatedData } : user
    );

    setUsers(updatedUsers);
    setCurrentUser(prev => ({ ...prev, ...updatedData }));
    return true;
  };

  return (
    <AuthContext.Provider value={{ currentUser, signup, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
