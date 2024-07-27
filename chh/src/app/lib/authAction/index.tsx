'use server';

import { getPayloadHMR } from '@payloadcms/next/utilities';
import configPromise from '@payload-config';
import { cookies } from 'next/headers';
import { redirect } from 'next/dist/server/api-utils';

interface FormDataProps {
  email: string;
  password: string;
  username: string;
}

export async function createUser(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const username = formData.get('username') as string;

  const payload = await getPayloadHMR({
    config: configPromise,
  });

  try {
    const newUser = await payload.create({
      collection: 'users',
      data: {
        email,
        password,
        username,
        role: 'user',
      },
    });
    console.log('new user created', newUser);

    return 'User created. Check your email for the verification link.';
  } catch (error: any) {
    if (error.type) {
      switch (error.type) {
        case 'UserCreationFailed':
          return 'Failed to create user';
        default:
          return 'Something went wrong during user creation';
      }
    }
    throw error;
  }
}

export async function loginUser(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const payload = await getPayloadHMR({
    config: configPromise,
  });

  try {
    const result = await payload.login({
      collection: 'users',
      email,
      password,
    });

    if (result.token) {
      cookies().set({
        name: 'payload-token',
        value: result.token,
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });
      redirect('/');
    } else {
      throw new Error('Token is undefined');
    }
  } catch (error: any) {
    if (error.type) {
      switch (error.type) {
        case 'LoginFailed':
          return 'Failed to login';
        default:
          return 'Something went wrong during login';
      }
    }
    throw error;
  }
}

export async function forgetPassword(formData: FormData) {
  const email = formData.get('email') as string;

  const payload = await getPayloadHMR({
    config: configPromise,
  });

  try {
    await payload.forgotPassword({
      collection: 'users',
      data: {
        email: email,
      },
      disableEmail: false,
    });
    return 'ok';
  } catch (error: any) {
    throw new Error('Failed to send forgot password email');
  }
}
