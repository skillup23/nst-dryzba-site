import RegistrationForm from '@/components/RegistrationForm';
import Link from 'next/link';
import React from 'react';

const Register = () => {
  return (
    <div className="flex flex-col justify-center items-center m-4">
      <RegistrationForm />
      <p className="my-3">
        У вас уже есть аккаунт?
        <Link href="/" className="mx-2 underline">
          Войти в систему
        </Link>
      </p>
    </div>
  );
};

export default Register;
