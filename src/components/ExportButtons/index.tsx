/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Container } from './styled';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import {
  geralJobType,
  MonthJobType,
  ProjectJobType,
  UserJobType,
} from '../../pages/ReportLaunch/dto';
import { launchType } from '../../pages/Launch/dto';

type propsTypes = {
  title?: string;
  type: 'launch' | 'geral' | 'months' | 'projects' | 'users';
  arrReports?: {
    launch?: launchType[];
    geralJob?: geralJobType[];
    monthsJob?: MonthJobType[];
    projectsJob?: ProjectJobType[];
    usersJob?: UserJobType[];
  };
};

function ExportButtons(props: propsTypes): JSX.Element {
  function exportExcel() {
    console.log('exported excel');
  }

  function exportPdf() {
    console.log('exported pdf');

    if (props.type === 'launch') {
      const { header, body } = getDataLaunch();
      generateReportPdf(header, body, props.title);
    } else if (props.type === 'geral') {
      const { header, body } = getDataReportGeral();
      generateReportPdf(header, body, props.title);
    } else if (props.type === 'months') {
      const { header, body } = getDataReportMonths();
      generateReportPdf(header, body, props.title);
    } else if (props.type === 'projects') {
      const { header, body } = getDataReportProjects();
      generateReportPdf(header, body, props.title);
    } else if (props.type === 'users') {
      const { header, body } = getDataReportUsers();
      generateReportPdf(header, body, props.title);
    }
  }

  function getDataLaunch() {
    const header = [
      {
        text: 'ID',
        fontSize: 12,
        bold: true,
      },
      {
        text: 'Horas',
        fontSize: 12,
        bold: true,
      },
      {
        text: 'Dia',
        fontSize: 12,
        bold: true,
      },
      {
        text: 'Usuário',
        fontSize: 12,
        bold: true,
      },
      {
        text: 'Projeto',
        fontSize: 12,
        bold: true,
      },
    ];

    const body = props.arrReports?.launch?.map((element) => {
      return [
        { text: element._id, fontSize: 12 },
        {
          text: element.hours,
          fontSize: 12,
        },
        {
          text: element.day,
          fontSize: 12,
        },
        {
          text: element.user,
          fontSize: 12,
        },
        {
          text: element.project,
          fontSize: 12,
        },
      ];
    });
    return { header, body };
  }

  function getDataReportGeral() {
    const header = [
      {
        text: 'Total horas trabalhadas',
        fontSize: 12,
        bold: true,
      },
      {
        text: 'Projeto com mais horas trabalhadas',
        fontSize: 12,
        bold: true,
      },
      {
        text: 'Projeto com menos horas trabalhadas',
        fontSize: 12,
        bold: true,
      },
      {
        text: 'Usuário com mais horas trabalhadas',
        fontSize: 12,
        bold: true,
      },
      {
        text: 'Usuário com menos horas trabalhadas',
        fontSize: 12,
        bold: true,
      },
      {
        text: 'Mês com mais horas trabalhadas',
        fontSize: 12,
        bold: true,
      },
      {
        text: 'Mês com menos horas trabalhadas',
        fontSize: 12,
        bold: true,
      },
    ];

    const body = props.arrReports?.geralJob?.map((element) => {
      return [
        { text: element.qtyTotalJob, fontSize: 12 },
        {
          text: `${element.projectHighHoursJob[0]} (${element.projectHighHoursJob[1]})`,
          fontSize: 12,
        },
        {
          text: `${element.projectLowHoursJob[0]} (${element.projectLowHoursJob[1]})`,
          fontSize: 12,
        },
        {
          text: `${element.userHighHoursJob[0]} (${element.userHighHoursJob[1]})`,
          fontSize: 12,
        },
        {
          text: `${element.userLowHoursJob[0]} (${element.userLowHoursJob[1]})`,
          fontSize: 12,
        },
        {
          text: `${element.monthHighHoursJob[0]} (${element.monthHighHoursJob[1]})`,
          fontSize: 12,
        },
        {
          text: `${element.monthLowHoursJob[0]} (${element.monthLowHoursJob[1]})`,
          fontSize: 12,
        },
      ];
    });
    return { header, body };
  }

  function getDataReportMonths() {
    const header = [
      {
        text: 'Nome do Mês',
        fontSize: 12,
        bold: true,
      },
      {
        text: 'Total horas trabalhadas',
        fontSize: 12,
        bold: true,
      },
      {
        text: 'Projeto com mais horas trabalhadas',
        fontSize: 12,
        bold: true,
      },
      {
        text: 'Projeto com menos horas trabalhadas',
        fontSize: 12,
        bold: true,
      },
      {
        text: 'Usuário com mais horas trabalhadas',
        fontSize: 12,
        bold: true,
      },
      {
        text: 'Usuário com menos horas trabalhadas',
        fontSize: 12,
        bold: true,
      },
    ];

    const body = props.arrReports?.monthsJob?.map((element) => {
      return [
        { text: element.name, fontSize: 12 },
        { text: element.qtyTotalJob, fontSize: 12 },
        {
          text: `${element.projectHighHoursJob[0]} (${element.projectHighHoursJob[1]})`,
          fontSize: 12,
        },
        {
          text: `${element.projectLowHoursJob[0]} (${element.projectLowHoursJob[1]})`,
          fontSize: 12,
        },
        {
          text: `${element.userHighHoursJob[0]} (${element.userHighHoursJob[1]})`,
          fontSize: 12,
        },
        {
          text: `${element.userLowHoursJob[0]} (${element.userLowHoursJob[1]})`,
          fontSize: 12,
        },
      ];
    });
    return { header, body };
  }

  function getDataReportProjects() {
    const header = [
      {
        text: 'Nome do Projeto',
        fontSize: 12,
        bold: true,
      },
      {
        text: 'Total horas trabalhadas',
        fontSize: 12,
        bold: true,
      },
      {
        text: 'Mês com mais horas trabalhadas',
        fontSize: 12,
        bold: true,
      },
      {
        text: 'Mês com menos horas trabalhadas',
        fontSize: 12,
        bold: true,
      },
      {
        text: 'Usuário com mais horas trabalhadas',
        fontSize: 12,
        bold: true,
      },
      {
        text: 'Usuário com menos horas trabalhadas',
        fontSize: 12,
        bold: true,
      },
    ];

    const body = props.arrReports?.projectsJob?.map((element) => {
      return [
        { text: element.name, fontSize: 12 },
        { text: element.qtyTotalJob, fontSize: 12 },
        {
          text: `${element.monthHighHoursJob[0]} (${element.monthHighHoursJob[1]})`,
          fontSize: 12,
        },
        {
          text: `${element.monthLowHoursJob[0]} (${element.monthLowHoursJob[1]})`,
          fontSize: 12,
        },
        {
          text: `${element.userHighHoursJob[0]} (${element.userHighHoursJob[1]})`,
          fontSize: 12,
        },
        {
          text: `${element.userLowHoursJob[0]} (${element.userLowHoursJob[1]})`,
          fontSize: 12,
        },
      ];
    });
    return { header, body };
  }

  function getDataReportUsers() {
    const header = [
      {
        text: 'Nome do Usuário',
        fontSize: 12,
        bold: true,
      },
      {
        text: 'Total horas trabalhadas',
        fontSize: 12,
        bold: true,
      },
      {
        text: 'Projeto com mais horas trabalhadas',
        fontSize: 12,
        bold: true,
      },
      {
        text: 'Projeto com menos horas trabalhadas',
        fontSize: 12,
        bold: true,
      },
      {
        text: 'Mês com mais horas trabalhadas',
        fontSize: 12,
        bold: true,
      },
      {
        text: 'Mês com menos horas trabalhadas',
        fontSize: 12,
        bold: true,
      },
    ];

    const body = props.arrReports?.usersJob?.map((element) => {
      return [
        { text: element.name, fontSize: 12 },
        { text: element.qtyTotalJob, fontSize: 12 },
        {
          text: `${element.projectHighHoursJob[0]} (${element.projectHighHoursJob[1]})`,
          fontSize: 12,
        },
        {
          text: `${element.projectLowHoursJob[0]} (${element.projectLowHoursJob[1]})`,
          fontSize: 12,
        },
        {
          text: `${element.monthHighHoursJob[0]} (${element.monthHighHoursJob[1]})`,
          fontSize: 12,
        },
        {
          text: `${element.monthLowHoursJob[0]} (${element.monthLowHoursJob[1]})`,
          fontSize: 12,
        },
      ];
    });
    return { header, body };
  }

  function generateReportPdf(xheader: any, xbody: any, title?: string) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const header: any = [
      {
        text: title ?? 'Relatório',
        fontSize: 16,
        bold: true,
        margin: [15, 20, 0, 45],
      },
    ];

    const content: any = [
      {
        table: {
          body: [xheader, ...xbody],
        },
      },
    ];

    const docDefinitions: any = {
      pageSize: 'A4',
      pageMargins: [14, 53, 14, 48],
      header: header,
      content: content,
    };

    pdfMake.createPdf(docDefinitions).open();
  }

  return (
    <Container>
      <button type="button" onClick={exportExcel}>
        Exportar Excel
      </button>
      <button type="button" onClick={exportPdf}>
        Exportar PDF
      </button>
    </Container>
  );
}

export default ExportButtons;
