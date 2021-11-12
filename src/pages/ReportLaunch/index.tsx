import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import TableReportGeral from '../../components/TableReportGeral';
import TableReportMonth from '../../components/TableReportMonth';
import TableReportProject from '../../components/TableReportProject';
import TableReportUser from '../../components/TableReportUser';
import requestApi from '../../hooks/requestApi';
import handleProjectHoursJob from '../../utils/handleProjectHoursJob';
import { hoursType } from '../Home/dto';
import { projectType, userType } from '../HoursRegistration/dto';
import { geralJobType, MonthJobType, ProjectJobType, UserJobType } from './dto';
import { Container } from './styled';

function ReportLaunch(): JSX.Element {
  const defaultGeralJob: geralJobType[] = [];
  const defaultMonthsJob: MonthJobType[] = [];
  const defaultProjectsJob: ProjectJobType[] = [];
  const defaultUsersJob: UserJobType[] = [];

  const [geralJob, setGeralJob] = useState(defaultGeralJob);
  const [monthsJob, setMonthsJob] = useState(defaultMonthsJob);
  const [projectsJob, setProjectsJob] = useState(defaultProjectsJob);
  const [usersJob, setUsersJob] = useState(defaultUsersJob);

  const { getRequest } = requestApi();

  useEffect(() => {
    async function getAPI() {
      let arrProjects: projectType[] = [];
      let arrUsers: userType[] = [];
      let arrHours: hoursType[] = [];

      function callbackProject(data: projectType[]) {
        arrProjects = data;
      }

      function callbackUser(data: userType[]) {
        arrUsers = data;
      }

      function callbackHours(data: hoursType[]) {
        arrHours = data;

        setTimeout(() => {
          handleGeralJob(arrHours, arrProjects, arrUsers);
          handleMonthsJob(arrHours, arrProjects, arrUsers);
          handleProjectsJob(arrHours, arrProjects, arrUsers);
          handleUsersJob(arrHours, arrProjects, arrUsers);
        }, 200);
      }

      getRequest(`hours`, callbackHours);
      getRequest('project', callbackProject);
      getRequest('user', callbackUser);

      // const arrLaunch: hoursType[] = [];
      // let count = 0;

      // arrHours.forEach(async (element: hoursType) => {
      //   let projectName = '';
      //   arrProjects.forEach((project) => {
      //     if (project._id === element.project) {
      //       projectName = project.name;
      //       return;
      //     }
      //   });

      //   let userName = '';
      //   arrUsers.forEach((user) => {
      //     if (user._id === element.user) {
      //       userName = user.name;
      //       return;
      //     }
      //   });

      //   arrLaunch.push({
      //     _id: element._id,
      //     hours: element.hours,
      //     day: element.day,
      //     project: projectName,
      //     user: userName,
      //   });

      //   if (count === arrHours.length - 1) {
      //     const arrSorted = arrLaunch.sort((a, b) => {
      //       return a.day < b.day ? 1 : a.day > b.day ? -1 : 0;
      //     });

      //     handleLoading(false);
      //   }
      //   count++;
      // });
    }
    getAPI();
  }, []);

  function handleGeralJob(
    arrHours: hoursType[],
    arrProjects: projectType[],
    arrUsers: userType[],
  ) {
    const objGeralJob: geralJobType = {
      qtyTotalJob: 0,
      projectHighHoursJob: ['', 0],
      projectLowHoursJob: ['', 0],
      monthHighHoursJob: ['', 0],
      monthLowHoursJob: ['', 0],
      userHighHoursJob: ['', 0],
      userLowHoursJob: ['', 0],
    };

    const newArrProjects: (string | number)[][] = [
      ['Temp', 0],
      ['Default', 0],
    ];

    const newArrUsers: (string | number)[][] = [
      ['Temp', 0],
      ['Default', 0],
    ];

    arrHours.forEach((element) => {
      handleProjectHoursJob(element, newArrProjects, arrProjects);
    });
    newArrProjects.shift();

    arrHours.forEach((element) => {
      handleProjectHoursJob(element, newArrUsers, arrUsers);
    });
    newArrUsers.shift();

    const arrMonths = [
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

    arrHours.forEach((element) => {
      objGeralJob.qtyTotalJob += +element.hours;

      const highAndLowProject = getHighAndlowMounth(newArrProjects);
      objGeralJob.projectHighHoursJob = highAndLowProject.high;
      objGeralJob.projectLowHoursJob = highAndLowProject.low;

      const highAndLowUser = getHighAndlowMounth(newArrUsers);
      objGeralJob.userHighHoursJob = highAndLowUser.high;
      objGeralJob.userLowHoursJob = highAndLowUser.low;

      const month = +element.day.slice(5, 7);
      arrMonths[month - 1][1] = +arrMonths[month - 1][1] + element.hours;
      const highAndLowMonth = getHighAndlowMounth(arrMonths);
      objGeralJob.monthHighHoursJob = highAndLowMonth.high;
      objGeralJob.monthLowHoursJob = highAndLowMonth.low;
    });

    setGeralJob([objGeralJob]);
  }

  function handleMonthsJob(
    arrHours: hoursType[],
    arrProjects: projectType[],
    arrUsers: userType[],
  ) {
    const objMonthJob: MonthJobType = {
      name: '',
      qtyTotalJob: 0,
      projectHighHoursJob: ['', 0],
      projectLowHoursJob: ['', 0],
      userHighHoursJob: ['', 0],
      userLowHoursJob: ['', 0],
    };

    const arrObjMonthJob: MonthJobType[] = [];

    const arrMonths = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];

    arrMonths.forEach((element, index) => {
      const newObjMonthJob = { ...objMonthJob };
      newObjMonthJob.name = element;

      const newArrProject: (string | number)[][] = [];
      const newArrUsers: (string | number)[][] = [];

      arrHours.forEach((hour) => {
        const month = +hour.day.slice(5, 7) - 1;

        if (month === index) {
          newObjMonthJob.qtyTotalJob += hour.hours;

          arrProjects.forEach((project) => {
            if (project._id === hour.project) {
              newArrProject.push([project.name, hour.hours]);
            }
          });

          arrUsers.forEach((user) => {
            if (user._id === hour.user) {
              newArrUsers.push([user.name, hour.hours]);
            }
          });

          const highAndLowMonth = getHighAndlowMounth(newArrProject);
          newObjMonthJob.projectHighHoursJob = highAndLowMonth.high;
          newObjMonthJob.projectLowHoursJob = highAndLowMonth.low;

          const highAndLowUser = getHighAndlowMounth(newArrUsers);
          newObjMonthJob.userHighHoursJob = highAndLowUser.high;
          newObjMonthJob.userLowHoursJob = highAndLowUser.low;
        }
      });

      arrObjMonthJob.push(newObjMonthJob);
    });

    setMonthsJob(arrObjMonthJob);
  }

  function handleProjectsJob(
    arrHours: hoursType[],
    arrProjects: projectType[],
    arrUsers: userType[],
  ) {
    const objProjectJob: ProjectJobType = {
      name: '',
      qtyTotalJob: 0,
      monthHighHoursJob: ['', 0],
      monthLowHoursJob: ['', 0],
      userHighHoursJob: ['', 0],
      userLowHoursJob: ['', 0],
    };

    const arrObjProjectJob: ProjectJobType[] = [];

    arrProjects.forEach((element) => {
      const newObjProjectJob = { ...objProjectJob };
      newObjProjectJob.name = element.name;

      const newArrUsers: (string | number)[][] = [];

      const arrMonths = [
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

      arrHours.forEach((hour) => {
        if (hour.project === element._id) {
          newObjProjectJob.qtyTotalJob += hour.hours;

          arrUsers.forEach((user) => {
            if (user._id === hour.user) {
              newArrUsers.push([user.name, hour.hours]);
            }
          });

          const highAndLowUser = getHighAndlowMounth(newArrUsers);
          newObjProjectJob.userHighHoursJob = highAndLowUser.high;
          newObjProjectJob.userLowHoursJob = highAndLowUser.low;

          const month = +hour.day.slice(5, 7);
          arrMonths[month - 1][1] = +arrMonths[month - 1][1] + hour.hours;
          const highAndLowMonth = getHighAndlowMounth(arrMonths);
          newObjProjectJob.monthHighHoursJob = highAndLowMonth.high;
          newObjProjectJob.monthLowHoursJob = highAndLowMonth.low;
        }
      });

      arrObjProjectJob.push(newObjProjectJob);
    });

    setProjectsJob(arrObjProjectJob);
  }

  function handleUsersJob(
    arrHours: hoursType[],
    arrProjects: projectType[],
    arrUsers: userType[],
  ) {
    const objUserJob: UserJobType = {
      name: '',
      qtyTotalJob: 0,
      projectHighHoursJob: ['', 0],
      projectLowHoursJob: ['', 0],
      monthHighHoursJob: ['', 0],
      monthLowHoursJob: ['', 0],
    };

    const arrObjUserJob: UserJobType[] = [];

    arrUsers.forEach((element) => {
      const newObjUserJob = { ...objUserJob };
      newObjUserJob.name = element.name;

      const newArrProject: (string | number)[][] = [];

      const arrMonths = [
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

      arrHours.forEach((hour) => {
        if (hour.user === element._id) {
          newObjUserJob.qtyTotalJob += hour.hours;

          arrProjects.forEach((project) => {
            if (project._id === hour.project) {
              newArrProject.push([project.name, hour.hours]);
            }
          });

          const highAndLowUser = getHighAndlowMounth(newArrProject);
          newObjUserJob.projectHighHoursJob = highAndLowUser.high;
          newObjUserJob.projectLowHoursJob = highAndLowUser.low;

          const month = +hour.day.slice(5, 7);
          arrMonths[month - 1][1] = +arrMonths[month - 1][1] + hour.hours;
          const highAndLowMonth = getHighAndlowMounth(arrMonths);
          newObjUserJob.monthHighHoursJob = highAndLowMonth.high;
          newObjUserJob.monthLowHoursJob = highAndLowMonth.low;
        }
      });

      arrObjUserJob.push(newObjUserJob);
    });

    setUsersJob(arrObjUserJob);
  }

  function getHighAndlowMounth(arr: (string | number)[][]) {
    let high = ['', 0];
    let low = ['', 0];

    if (arr.length) {
      high = arr.reduce((high, value) => {
        if (value[1] > high[1]) return value;
        return high;
      });

      low = arr.reduce((low, value) => {
        if (value[1] < low[1]) return value;
        return low;
      });
    }

    return { high, low };
  }

  return (
    <>
      <Header />
      <Container>
        <h1>Relatórios</h1>

        <TableReportGeral geralJob={geralJob} />
        <TableReportMonth monthsJob={monthsJob} />
        <TableReportProject projectsJob={projectsJob} />
        <TableReportUser usersJob={usersJob} />
      </Container>
    </>
  );
}

export default ReportLaunch;
