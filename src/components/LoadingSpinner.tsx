import { type CSSProperties } from 'react';
// need to import this for ts
import { BounceLoader } from 'react-spinners';

type Props = {
  isLoading?: boolean;
};

const LoadingSpinner = ({ isLoading = true }: Props) => {
  const override: CSSProperties = {};

  return (
    <>
      <div id="loadingSpinner">
        <BounceLoader
          color="#7ADAA5"
          loading={isLoading}
          cssOverride={override}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </>
  );
};

export default LoadingSpinner;
