import React from 'react';
import { Container } from './styled';
import { MonthJobType } from '../../pages/ReportLaunch/dto';
import ExportButtons from '../ExportButtons';

type propsTypes = {
  monthsJob: MonthJobType[];
};

function TableReportMonth(props: propsTypes): JSX.Element {
  return (
    <Container>
      <header>
        <h2>Por mês</h2>

        <ExportButtons
          title="Relatório por mês"
          type="months"
          arrReports={{ monthsJob: props.monthsJob }}
        />
      </header>

      <table>
        <thead>
          <tr>
            <th>Nome do Mês</th>
            <th>Total horas trabalhadas</th>
            <th>Projeto com mais horas trabalhadas</th>
            <th>Projeto com menos horas trabalhadas</th>
            <th>Usuário com mais horas trabalhadas</th>
            <th>Usuário com menos horas trabalhadas</th>
          </tr>
        </thead>

        <tbody>
          {props.monthsJob.map((element, index) => {
            return (
              <tr key={'m' + element.name + index}>
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

export default TableReportMonth;
