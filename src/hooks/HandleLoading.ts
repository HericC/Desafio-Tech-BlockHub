import { useState } from 'react';

type propTypes = {
  loading: boolean;
  handleLoading: (isLoading: boolean) => void;
};

function HandleLoading(): propTypes {
  const [loading, setLoading] = useState(false);

  function handleLoading(isLoading: boolean) {
    setLoading(isLoading);
  }

  return { loading, handleLoading };
}

export default HandleLoading;
