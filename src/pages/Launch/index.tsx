import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ExportButtons from '../../components/ExportButtons';
import Header from '../../components/Header';
import { LoadingContext } from '../../contexts/LoadingContext';
import axios from '../../services/axios';
import { projectType, userType } from '../HoursRegistration/dto';
import { launchType } from './dto';
import { Container } from './styled';

function Launch(): JSX.Element {
  const defaultLaunch: launchType[] = [];
  const [launch, setLaunch] = useState(defaultLaunch);
  const { handleLoading } = useContext(LoadingContext);

  useEffect(() => {
    async function getAPI() {
      try {
        handleLoading(true);
        const dataHours: launchType[] = await (await axios.get('/hours')).data;
        const dataProjects: projectType[] = await (
          await axios.get(`/project`)
        ).data;
        const dataUsers: userType[] = await (await axios.get(`/user`)).data;

        const arrLaunch: launchType[] = [];
        let count = 0;

        dataHours.forEach(async (element: launchType) => {
          let projectName = '';
          dataProjects.forEach((project) => {
            if (project._id === element.project) {
              projectName = project.name;
              return;
            }
          });

          let userName = '';
          dataUsers.forEach((user) => {
            if (user._id === element.user) {
              userName = user.name;
              return;
            }
          });

          arrLaunch.push({
            _id: element._id,
            hours: element.hours,
            day: element.day,
            project: projectName,
            user: userName,
          });

          if (count === dataHours.length - 1) {
            const arrSorted = arrLaunch.sort((a, b) => {
              return a.day < b.day ? 1 : a.day > b.day ? -1 : 0;
            });

            setLaunch(arrSorted);
            handleLoading(false);
          }
          count++;
        });
      } catch (err) {
        toast.error('Ocorreu um erro inesperado!');
        handleLoading(false);
      }
    }
    getAPI();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <header>
          <h1>Lançamentos</h1>

          <ExportButtons
            title="Lançamentos"
            type="launch"
            arrReports={{ launch }}
          />
        </header>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Horas</th>
              <th>Dia</th>
              <th>Usuário</th>
              <th>Projeto</th>
            </tr>
          </thead>

          <tbody>
            {launch.map((element) => {
              return (
                <tr key={element._id}>
                  <td>{element._id}</td>
                  <td>{element.hours}</td>
                  <td>
                    {element.day.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1')}
                  </td>
                  <td>{element.user}</td>
                  <td>{element.project}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Container>
    </>
  );
}

export default Launch;
