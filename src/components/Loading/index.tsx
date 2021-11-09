import React from 'react';
import ReactLoading from 'react-loading';
import { Container } from './styled';

type propTypes = {
  isLoading: boolean;
};
function Loading(props: propTypes): JSX.Element {
  if (!props.isLoading) return <></>;

  return (
    <Container>
      <ReactLoading type="spinningBubbles" width="120px" height="120px" />
    </Container>
  );
}

export default Loading;
