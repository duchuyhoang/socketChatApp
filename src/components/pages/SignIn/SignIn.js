import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Layout from '../../Layout';
import SVGIcon from '../../shared/SVGIcon';
import TextField from '../../shared/TextField';
import * as yup from 'yup';

function SignIn(props) {
  const schema = yup.object({
    email: yup
      .string()
      .required('Please enter your email!')
      .email('Email is not valid!'),
    password: yup.string().required('Please enter your password!'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(schema),
  });

  const handleLogin = (values) => {
    console.log(values);
  };

  return (
    <Layout>
      <div className='sign-in'>
        <div className='sign-in__top'>
          <h1>Sign in to Belo</h1>
          <small>
            No account?
            <Link to='/signup'>Sign up</Link>
          </small>
        </div>
        <form className='sign-in__form' onSubmit={handleSubmit(handleLogin)}>
          <div className='sign-in__form__content'>
            <Controller
              control={control}
              name='email'
              render={({ field: { name, onChange } }) => (
                <div className='input-field'>
                  <TextField
                    type='text'
                    label='Email'
                    inputChange={(e) => onChange(e)}
                    error={!!errors[name]}
                  />
                  {errors && errors[name] && (
                    <div className='input-field__error'>
                      {errors[name].message}
                    </div>
                  )}
                </div>
              )}
            />
            <Controller
              control={control}
              name='password'
              render={({ field: { name, onChange } }) => (
                <div className='input-field'>
                  <TextField
                    type='password'
                    label='password'
                    inputChange={(e) => onChange(e)}
                    error={!!errors[name]}
                  />
                  {errors && errors[name] && (
                    <div className='input-field__error'>
                      {errors[name].message}
                    </div>
                  )}
                </div>
              )}
            />
          </div>
          <button className='btn'>Login</button>
        </form>
        <button className='btn btn--white'>
          <SVGIcon name='google' />
          <span>Login with google</span>
        </button>
      </div>
    </Layout>
  );
}

export default SignIn;
