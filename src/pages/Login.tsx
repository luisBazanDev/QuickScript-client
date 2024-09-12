import React from 'react';
import LoginForm from '../components/organisms/loginForm';
import Logo from '../components/atoms/logo';

const Login: React.FC = () => {
  return (
    <div className='flex h-screen'>
      <div className='flex flex-col justify-center items-center w-1/2'>
        <Logo />
      </div>
      <div className='flex flex-col justify-center items-center w-1/2'>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
