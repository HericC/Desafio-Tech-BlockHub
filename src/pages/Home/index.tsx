import React, { useEffect, useState } from 'react';
import { Container } from './styled';
import Header from '../../components/Header';
import SectionGraphic from '../../components/SectionGraphic';
import requestApi from '../../hooks/requestApi';
import { projectType } from '../HoursRegistration/dto';
import { hoursType } from './dto';
import handleProjectHoursJob from '../../utils/handleProjectHoursJob';

function Home(): JSX.Element {
  const defaultProjectHoursJob = [
    ['Horas trabalhadas', 'Horas'],
    ['Default', 0],
  ];

  const defaultMonthsHoursJob = [
    ['Horas trabalhadas', 'Horas'],
    ['Janeiro', 0],
    ['Fevereiro', 0],
    ['Março', 0],
    ['Abril', 0],
    ['Maio', 0],
    ['Junho', 0],
    ['Julho', 0],
    ['Agosto', 0],
    ['Setembro', 0],
    ['Outubro', 0],
    ['Novembro', 0],
    ['Dezembro', 0],
  ];

  const [options, setOptions] = useState({ title: 'Horas Trabalhadas' });

  const [projectHoursJob, setProjectHoursJob] = useState(
    defaultProjectHoursJob,
  );
  const [monthsHoursJob, setMonthsHoursJob] = useState(defaultMonthsHoursJob);

  const { getRequest } = requestApi();

  useEffect(() => {
    let arrProjects: projectType[] = [];

    function callbackProject(data: projectType[]) {
      arrProjects = data;
    }

    function callback(data: hoursType[]) {
      setTimeout(() => {
        const arrProjectHoursJob = [...defaultProjectHoursJob];
        const arrMonthsHoursJob = [...defaultMonthsHoursJob];

        data.forEach((element) => {
          handleProjectHoursJob(element, arrProjectHoursJob, arrProjects);
          handleMonthsHoursJob(element, arrMonthsHoursJob);
        });

        const arrProjectHoursJobSorted = arrProjectHoursJob.sort((a, b) => {
          return a[1] < b[1] ? 1 : a[1] > b[1] ? -1 : 0;
        });

        setProjectHoursJob(arrProjectHoursJobSorted);
        setMonthsHoursJob(arrMonthsHoursJob);
      }, 200);
    }
    getRequest(`project`, callbackProject);
    getRequest('hours', callback);
  }, []);

  function handleMonthsHoursJob(
    element: hoursType,
    arrMonthsHoursJob: (string | number)[][],
  ) {
    const elementDay = new Date(element.day);
    const currentDay = new Date();

    const diffTime = Math.abs(elementDay.getTime() - currentDay.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));

    if (diffDays <= 365 * 55) {
      const indexMonth = +element.day.slice(5, 7);
      const qtdHours = +arrMonthsHoursJob[indexMonth][1];
      arrMonthsHoursJob[indexMonth][1] = qtdHours + +element.hours;
    }
  }

  return (
    <>
      <Header />
      <Container>
        <SectionGraphic
          title="Horas trabalhadas por projeto."
          data={projectHoursJob}
          options={options}
        />
        <SectionGraphic
          title="Horas trabalhadas ao longo dos meses no periodo de 1 ano."
          data={monthsHoursJob}
          options={options}
        />
      </Container>
    </>
  );
}

export default Home;
