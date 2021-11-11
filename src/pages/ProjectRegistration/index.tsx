import React, { useContext, useEffect, useState } from 'react';
import { removeClassErrors, setErrors } from '../../utils/inputErrors';
import Header from '../../components/Header';
import { Container } from './styled';
import { payloadTypes } from './dto';
import axios from '../../services/axios';
import { LoadingContext } from '../../contexts/LoadingContext';
import { toast } from 'react-toastify';

type dataTypes = {
  name: HTMLInputElement;
};

type targetTypes = dataTypes & HTMLFormElement;

function ProjectRegistration(): JSX.Element {
  const [name, setName] = useState('');
  const { handleLoading } = useContext(LoadingContext);

  useEffect(() => {
    const element = document.querySelector('form input') as HTMLInputElement;
    element?.focus();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { name } = event.target as targetTypes;
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

    const payload: payloadTypes = {
      name: name.value,
    };

    if (!formError) {
      try {
        handleLoading(true);
        const { data } = await axios.post('/project', payload);

        setName('');

        toast.success('Projeto cadastrado!');
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
          <h2>Cadastro de Projeto</h2>

          <label>
            <span>Nome:</span>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Nome"
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <button type="submit">Cadastrar</button>
        </form>
      </Container>
    </>
  );
}

export default ProjectRegistration;
