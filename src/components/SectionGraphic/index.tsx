import React from 'react';
import { Container } from './styled';
import { Chart } from 'react-google-charts';

type propTypes = {
  title: string;
  data: (string | number)[][];
  options: { title: string };
};

function SectionGraphic(props: propTypes): JSX.Element {
  return (
    <Container>
      <h2>{props.title}</h2>

      <div className="graphic">
        <Chart
          className="graphic"
          width={'600px'}
          height={'300px'}
          chartType="ColumnChart"
          data={props.data}
          options={props.options}
        />
        <Chart
          className="graphic"
          width={'500px'}
          height={'300px'}
          chartType="PieChart"
          data={props.data}
          options={props.options}
        />
      </div>
    </Container>
  );
}

export default SectionGraphic;
