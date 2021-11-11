import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Header from '../../components/Header';
import { LoadingContext } from '../../contexts/LoadingContext';
import axios from '../../services/axios';
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
        const { data } = await axios.get('/hours');
        const arrLaunch: launchType[] = [];
        let count = 0;

        await data.forEach(async (element: launchType) => {
          handleLoading(true);

          const dataProject = await (
            await axios.get(`/project/${element.project}`)
          ).data;

          const dataUser = await (
            await axios.get(`/user/${element.user}`)
          ).data;

          arrLaunch.push({
            _id: element._id,
            hours: element.hours,
            day: element.day,
            project: dataProject.name,
            user: dataUser.name,
          });

          if (count === data.length - 1) {
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
        <h1>Lançamentos</h1>

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
