import React from 'react';
import { Container } from './styled';
import { UserJobType } from '../../pages/ReportLaunch/dto';
import ExportButtons from '../ExportButtons';

type propsTypes = {
  usersJob: UserJobType[];
};

function TableReportUser(props: propsTypes): JSX.Element {
  return (
    <Container>
      <header>
        <h2>Por usuário</h2>

        <ExportButtons
          title="Relatório por usuário"
          type="users"
          arrReports={{ usersJob: props.usersJob }}
        />
      </header>

      <table>
        <thead>
          <tr>
            <th>Nome do Usuário</th>
            <th>Total horas trabalhadas</th>
            <th>Projeto com mais horas trabalhadas</th>
            <th>Projeto com menos horas trabalhadas</th>
            <th>Mês com mais horas trabalhadas</th>
            <th>Mês com menos horas trabalhadas</th>
          </tr>
        </thead>

        <tbody>
          {props.usersJob.map((element, index) => {
            return (
              <tr key={'u' + element.name + index}>
                <td>{element.name}</td>
                <td>{element.qtyTotalJob}</td>
                <td>
                  {element.projectHighHoursJob[0]} (
                  {element.projectHighHoursJob[1]})
                </td>
                <td>
                  {element.projectLowHoursJob[0]} (
                  {element.projectLowHoursJob[1]})
                </td>
                <td>
                  {element.monthHighHoursJob[0]} ({element.monthHighHoursJob[1]}
                  )
                </td>
                <td>
                  {element.monthLowHoursJob[0]} ({element.monthLowHoursJob[1]})
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Container>
  );
}

export default TableReportUser;
