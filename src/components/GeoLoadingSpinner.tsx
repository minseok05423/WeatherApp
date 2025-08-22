import { type CSSProperties } from 'react';
// need to import this for ts
import { FadeLoader } from 'react-spinners';

type Props = {
  isLoading?: boolean;
};

const GeoLoadingSpinner = ({ isLoading = true }: Props) => {
  const override: CSSProperties = {};

  return (
    <div
      id="loadingSpinner"
      className="flex justify-center items-center h-[20px] w-full transform scale-50"
    >
      <FadeLoader
        color="black"
        loading={isLoading}
        cssOverride={override}
        height={15}
        width={5}
        radius={5}
        margin={2}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default GeoLoadingSpinner;
