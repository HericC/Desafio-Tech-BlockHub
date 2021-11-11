import React, { useContext, useEffect, useState } from 'react';
import { removeClassErrors, setErrors } from '../../utils/inputErrors';
import Header from '../../components/Header';
import { Container } from './styled';
import validator from 'validator';
import { payloadTypes } from './dto';
import axios from '../../services/axios';
import { LoadingContext } from '../../contexts/LoadingContext';
import { toast } from 'react-toastify';

type dataTypes = {
  name: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
};

type targetTypes = dataTypes & HTMLFormElement;

function UserRegistration(): JSX.Element {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleLoading } = useContext(LoadingContext);

  useEffect(() => {
    const element = document.querySelector('form input') as HTMLInputElement;
    element?.focus();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { name, email, password } = event.target as targetTypes;
    let formError = false;

    if (!name.value) {
      formError = true;
      setErrors(name, 'Nome requerido');
    } else if (name.value.length < 4 || name.value.length > 250) {
      formError = true;
      setErrors(name, 'O nome precisa ter entre 4 e 50 caracteres');
    } else {
      removeClassErrors(name);
    }

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
      name: name.value,
      email: email.value,
      password: password.value,
    };

    if (!formError) {
      try {
        handleLoading(true);
        const { data } = await axios.post('/user', payload);

        setName('');
        setEmail('');
        setPassword('');

        toast.success('Usuário cadastrado!');
        handleLoading(false);
      } catch (err) {
        toast.error('Ocorreu um erro inesperado!');
        handleLoading(false);
      }
    }
  }

  return (
    <>
      <Header />
      <Container>
        <form onSubmit={handleSubmit}>
          <h2>Cadastro de Usuário</h2>

          <label>
            Nome:
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Nome"
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label>
            E-mail:
            <input
              type="text"
              name="email"
              value={email}
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            Senha:
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button type="submit">Cadastrar</button>
        </form>
      </Container>
    </>
  );
}

export default UserRegistration;
