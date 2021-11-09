import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import { Container } from './styled';
import validator from 'validator';
import { toast } from 'react-toastify';
import { payloadTypes } from './dto';

type dataTypes = {
  email: HTMLInputElement;
  password: HTMLInputElement;
};

type targetTypes = dataTypes & HTMLInputElement;

function Login(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleLogin } = useContext(AuthContext);

  let formError = false;

  useEffect(() => {
    const form = document.querySelector('#formLogin') as HTMLFormElement;
    form.email.focus();
  }, []);

  function setErrors(element: HTMLInputElement, msg: string) {
    formError = true;
    element.classList.add('errors');
    toast.warning(msg);
  }

  function removeClassErrors(element: HTMLInputElement) {
    element.classList.remove('errors');
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { email, password } = event.target as targetTypes;

    if (!email.value) {
      setErrors(email, 'E-mail requerido');
    } else if (!validator.isEmail(email.value)) {
      setErrors(email, 'E-mail inválido');
    } else {
      removeClassErrors(email);
    }

    if (!password.value) {
      setErrors(password, 'Senha requerido');
    } else if (password.value.length < 4 || password.value.length > 50) {
      setErrors(password, 'A senha precisa ter entre 4 e 50 caracteres');
    } else {
      removeClassErrors(password);
    }

    const payload: payloadTypes = {
      email: email.value,
      password: password.value,
    };

    if (!formError) handleLogin(payload);
  }

  return (
    <Container>
      <form onSubmit={handleSubmit} id="formLogin">
        <h2>Login</h2>

        <input
          type="text"
          name="email"
          value={email}
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          name="password"
          value={password}
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Entrar</button>
      </form>
    </Container>
  );
}

export default Login;
