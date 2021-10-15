import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import man from '../../../assets/images/man.png';
import woman from '../../../assets/images/woman.png';
import Layout from '../../components/Layout';
import Checkbox from '../../shared/Checkbox';
import Grid from '../../shared/Grid';
import SVGIcon from '../../shared/SVGIcon';
import TextField from '../../shared/TextField';
import Upload from '../../shared/Upload';

const defaultValues = {
  email: '',
  gender: 'male',
  password: '',
  retypePassword: '',
};

function SignUp(props) {
  const [isMale, setIsMale] = useState(true);
  const [avatar, setAvatar] = useState(null);

  const schema = yup
    .object({
      email: yup
        .string()
        .required('Please enter your email')
        .email('Email is not valid'),
      password: yup.string().required('Please enter password'),
      retypePassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Retype Password must be equal Password'),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const handleSignUp = (values) => {
    values.avatar = avatar;
    console.log('data', values);
  };

  return (
    <Layout>
      <div className='sign-in'>
        <div className='sign-in__top'>
          <h1>Sign up to Belo</h1>
          <small>
            Already to account?
            <Link to='/login'>Login in</Link>
          </small>
        </div>
        <form className='sign-in__form' onSubmit={handleSubmit(handleSignUp)}>
          <div className='sign-in__form__content'>
            <Upload
              image={isMale ? man : woman}
              accept='image/png, image/jpeg, image/jpg'
              onUpload={(file) => setAvatar(file)}
            />
            <div>
              <div className='sign-in__form__content__title'>Gender</div>
              <Grid col={2}>
                <Controller
                  control={control}
                  name='gender'
                  defaultValue='male'
                  render={({ field: { onChange, value } }) => (
                    <>
                      <Checkbox
                        type='radio'
                        checked={isMale}
                        value='male'
                        onChange={(e) => {
                          onChange(e);
                          setIsMale(true);
                        }}
                      >
                        Male
                      </Checkbox>
                      <Checkbox
                        type='radio'
                        checked={!isMale}
                        value='female'
                        onChange={(e) => {
                          onChange(e);
                          setIsMale(false);
                        }}
                      >
                        Female
                      </Checkbox>
                    </>
                  )}
                />
              </Grid>
            </div>
            <Controller
              control={control}
              name='email'
              render={({ field: { onChange, name } }) => (
                <div className='input-field'>
                  <TextField
                    type='text'
                    label='Email'
                    inputChange={(e) => {
                      onChange(e);
                    }}
                    name={name}
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
              render={({ field: { onChange, name } }) => (
                <div className='input-field'>
                  <TextField
                    type='password'
                    label='password'
                    inputChange={(e) => {
                      onChange(e);
                    }}
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
              name='retypePassword'
              render={({ field: { onChange, name } }) => (
                <div className='input-field'>
                  <TextField
                    type='password'
                    label='retype password'
                    inputChange={(e) => {
                      onChange(e);
                    }}
                    name={name}
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
          <button className='btn' type='submit'>
            Sign up
          </button>
        </form>
        <button className='btn btn--white'>
          <SVGIcon name='google' />
          <span>Login with google</span>
        </button>
      </div>
    </Layout>
  );
}

export default SignUp;
