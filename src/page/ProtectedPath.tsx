import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

type Props = {
  children: any;
};

export default function ProtectedPath({ children }: Props) {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to='/movies' replace={true} />;
  }

  return children;
}
