import React from 'react';
import { Container } from './styled';
import { geralJobType } from '../../pages/ReportLaunch/dto';
import ExportButtons from '../ExportButtons';

type propsTypes = {
  geralJob: geralJobType[];
};

function TableReportGeral(props: propsTypes): JSX.Element {
  return (
    <Container>
      <header>
        <h2>Geral</h2>

        <ExportButtons
          title="Relatório geral"
          type="geral"
          arrReports={{ geralJob: props.geralJob }}
        />
      </header>

      <table>
        <thead>
          <tr>
            <th>Total horas trabalhadas</th>
            <th>Projeto com mais horas trabalhadas</th>
            <th>Projeto com menos horas trabalhadas</th>
            <th>Usuário com mais horas trabalhadas</th>
            <th>Usuário com menos horas trabalhadas</th>
            <th>Mês com mais horas trabalhadas</th>
            <th>Mês com menos horas trabalhadas</th>
          </tr>
        </thead>

        <tbody>
          {props.geralJob.map((element, index) => {
            return (
              <tr key={'g' + index}>
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

export default TableReportGeral;
