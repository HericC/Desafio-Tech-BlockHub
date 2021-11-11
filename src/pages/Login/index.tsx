import React, { useContext, useEffect, useState } from 'react';
import { removeClassErrors, setErrors } from '../../utils/inputErrors';
import { AuthContext } from '../../contexts/AuthContext';
import { Container } from './styled';
import validator from 'validator';
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

  useEffect(() => {
    const element = document.querySelector('form input') as HTMLInputElement;
    element?.focus();
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { email, password } = event.target as targetTypes;
    let formError = false;

    if (!email.value) {
      formError = true;
      setErrors(email, 'E-mail requerido');
    } else if (!validator.isEmail(email.value)) {
      formError = true;
      setErrors(email, 'E-mail inválido');
    } else {
      removeClassErrors(email);
    }

    if (!password.value) {
      formError = true;
      setErrors(password, 'Senha requerido');
    } else if (password.value.length < 4 || password.value.length > 50) {
      formError = true;
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
