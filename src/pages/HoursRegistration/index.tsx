import React, { useContext, useEffect, useState } from 'react';
import { removeClassErrors, setErrors } from '../../utils/inputErrors';
import Header from '../../components/Header';
import { Container } from './styled';
import { payloadTypes, projectType, userType } from './dto';
import axios from '../../services/axios';
import { LoadingContext } from '../../contexts/LoadingContext';
import { toast } from 'react-toastify';
import validator from 'validator';

type dataTypes = {
  name: HTMLInputElement;
};

type targetTypes = dataTypes & HTMLFormElement;

function HoursRegistration(): JSX.Element {
  const currentDate = new Date().toISOString().slice(0, 10);

  const defaultProject: projectType = {
    _id: '',
    name: '',
  };

  const defaultUser: userType = {
    _id: '',
    name: '',
    email: '',
  };

  const [hours, setHours] = useState('');
  const [day, setDay] = useState(currentDate);
  const [project, setProject] = useState('');
  const [projects, setProjects] = useState([defaultProject]);
  const [user, setUser] = useState(defaultUser);
  const { handleLoading } = useContext(LoadingContext);

  function handleSetProject(data: projectType[]) {
    const projects: projectType[] = [];

    data.forEach((element) => {
      projects.push({
        _id: element._id,
        name: element.name,
      });
    });

    setProjects(projects);
  }

  function handleSetUser(data: userType) {
    const user: userType = {
      _id: data._id,
      name: data.name,
      email: data.email,
    };
    setUser(user);
  }

  useEffect(() => {
    const element = document.querySelector('form input') as HTMLInputElement;
    element?.focus();
  }, []);

  useEffect(() => {
    async function getAPI() {
      try {
        handleLoading(true);

        const dataProjects = await (await axios.get('/project')).data;
        handleSetProject(dataProjects);

        const dataUser = await (await axios.get(`/profile`)).data;
        handleSetUser(dataUser);

        handleLoading(false);
      } catch (err) {
        toast.error('Ocorreu um erro inesperado!');
        handleLoading(false);
      }
    }
    getAPI();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { hours, day, project, user } = event.target as targetTypes;
    let formError = false;

    if (!hours.value) {
      formError = true;
      setErrors(hours, 'Horas requerido');
    } else if (!validator.isInt(hours.value)) {
      formError = true;
      setErrors(hours, 'As horas deve ser um valor numérico inteiro');
    } else if (+hours.value <= 0) {
      formError = true;
      setErrors(hours, 'As horas deve ser um valor acima de 0');
    } else {
      removeClassErrors(hours);
    }

    if (!day.value) {
      formError = true;
      setErrors(day, 'Dia requerido');
    } else if (!validator.isDate(day.value)) {
      formError = true;
      setErrors(day, 'Dia inválido');
    } else {
      removeClassErrors(day);
    }

    if (!project.value) {
      formError = true;
      setErrors(project, 'Projeto requerido');
    } else {
      removeClassErrors(project);
    }

    if (!user.value) {
      formError = true;
      setErrors(user, 'Usuário requerido');
    } else {
      removeClassErrors(user);
    }

    const payload: payloadTypes = {
      hours: +hours.value,
      day: day.value,
      project: project.value,
      user: user.value,
    };

    if (!formError) {
      try {
        handleLoading(true);
        const { data } = await axios.post('/hours', payload);

        setHours('');
        setDay(currentDate);
        setProject('');
        setUser(defaultUser);

        toast.success('Lançamento Efetuado!');
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
          <h2>Lançamento</h2>

          <label>
            <span>Horas:</span>
            <input
              type="number"
              name="hours"
              value={hours}
              placeholder="Horas"
              onChange={(e) => setHours(e.target.value)}
            />
          </label>

          <label>
            Dia:
            <input
              type="date"
              name="day"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            />
          </label>

          <label>
            Projeto:
            <select
              name="project"
              value={project}
              onChange={(e) => setProject(e.target.value)}
            >
              <option value="" disabled>
                Escolha o Projeto
              </option>

              {projects.map((element) => {
                return (
                  <option value={element._id} key={element._id}>
                    {element.name}
                  </option>
                );
              })}
            </select>
          </label>

          <label>
            Usuário:
            <select name="user" defaultValue={user._id} disabled>
              <option value={user._id}>{user.name}</option>
            </select>
          </label>

          <button type="submit">Lançar</button>
        </form>
      </Container>
    </>
  );
}

export default HoursRegistration;
