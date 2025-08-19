import { type City } from '../App';
import CityItem from './CityItem';

const CityList = ({
  cityList,
  HandleDelete,
}: {
  cityList: City[];
  HandleDelete: (id: number) => void;
}) => {
  // {cityListL: City[]} is needed as {cityList} is an object nesting an array
  return (
    <div className="flex flex-col gap-[10px] w-full">
      {cityList.map((cityItem) => (
        <CityItem
          cityInfo={cityItem.cityInfo}
          key={cityItem.id}
          id={cityItem.id}
          weather={cityItem.weather}
          HandleDelete={HandleDelete}
        />
      ))}
    </div>
  );
};
// key should be at the parent element
// last time because there was a div around cityItem, it raised an error

export default CityList;
