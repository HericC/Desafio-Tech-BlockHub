import React from 'react';
import { Container } from './styled';
import { ProjectJobType } from '../../pages/ReportLaunch/dto';
import ExportButtons from '../ExportButtons';

type propsTypes = {
  projectsJob: ProjectJobType[];
};

function TableReportProject(props: propsTypes): JSX.Element {
  return (
    <Container>
      <header>
        <h2>Por projeto</h2>

        <ExportButtons
          title="Relatório por projeto"
          type="projects"
          arrReports={{ projectsJob: props.projectsJob }}
        />
      </header>

      <table>
        <thead>
          <tr>
            <th>Nome do Projeto</th>
            <th>Total horas trabalhadas</th>
            <th>Mês com mais horas trabalhadas</th>
            <th>Mês com menos horas trabalhadas</th>
            <th>Usuário com mais horas trabalhadas</th>
            <th>Usuário com menos horas trabalhadas</th>
          </tr>
        </thead>

        <tbody>
          {props.projectsJob.map((element, index) => {
            return (
              <tr key={'p' + element.name + index}>
                <td>{element.name}</td>
                <td>{element.qtyTotalJob}</td>
                <td>
                  {element.monthHighHoursJob[0]} ({element.monthHighHoursJob[1]}
                  )
                </td>
                <td>
                  {element.monthLowHoursJob[0]} ({element.monthLowHoursJob[1]})
                </td>
                <td>
                  {element.userHighHoursJob[0]} ({element.userHighHoursJob[1]})
                </td>
                <td>
                  {element.userLowHoursJob[0]} ({element.userLowHoursJob[1]})
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Container>
  );
}

export default TableReportProject;
