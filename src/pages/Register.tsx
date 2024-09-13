import React from 'react';
import Logo from '../components/atoms/logo';
import RegisterForm from '../components/organisms/registerForm';

const Login: React.FC = () => {
  return (
    <div className='flex h-screen'>
      <div className='flex flex-col justify-center items-center w-1/2'>
        <Logo logoType='primary'/>
      </div>
      <div className='flex flex-col justify-center items-center w-1/2'>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Login;
