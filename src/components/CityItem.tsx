import TrashIcon from '../assets/icons/trash.svg?react';
import { useElementContext } from '../context/ElementContext';
import { type City } from '../App';
import { GetWeatherIcon } from '../utils/weatherIcon';

const CityItem = ({
  cityInfo,
  id,
  weather,
  HandleDelete,
}: City & { HandleDelete: (id: number) => void }) => {
  const { selectedElementId, setSelectedElementId } = useElementContext();
  const cityName = cityInfo[0];
  const region = cityInfo[1];
  const country = cityInfo[2];
  const MainIcon = GetWeatherIcon(
    weather?.current?.condition?.code || 0,
    weather?.current?.condition?.text || null
  );
  const Temp = GetWeatherIcon(0, null);
  const Humidity = GetWeatherIcon(3, null);
  const Wind = GetWeatherIcon(2, null);

  return (
    <div
      className={`w-[260px] min-h-[100px] relative cursor-pointer rounded-[20px] ${selectedElementId === id ? 'bg-[#dee2e6] shadow-[12px_12px_10px_0_rgba(0,0,0,0.25)]' : 'bg-white shadow-[5px_5px_10px_0_rgba(0,0,0,0.2)]'} border border-[#adb5bd] `}
      onClick={() => {
        setSelectedElementId(id);
      }}
      id={`${id}`}
    >
      <div className="flex flex-col pt-[20px] pl-[20px] pb-[10px]">
        <div className="max-w-[120px]">
          <div className="">{cityName}</div>
          <div className="font-light text-[12px]">
            {region ? region : country}
          </div>
        </div>
        <div className="absolute top-[20px] left-[140px]">
          <MainIcon className="w-[40px] h-[40px]" />
        </div>
        <div className="flex flex-row w-[220px] justify-between mt-[10px]">
          <div className="flex flex-row">
            <Temp />
            <div className="ml-[5px]">{`${weather?.current?.temp_c || '--'}°`}</div>
          </div>
          <div className="flex flex-row">
            <Humidity />
            <div className="ml-[5px]">{`${weather?.current?.humidity || '--'}%`}</div>
          </div>
          <div className="flex flex-row">
            <Wind />
            <div className="ml-[5px]">{`${weather?.current?.wind_kph || '--'}km/h`}</div>
          </div>
        </div>
      </div>
      <button
        className="absolute top-[10px] right-[10px] cursor-pointer"
        onClick={() => HandleDelete(id)}
      >
        <TrashIcon className="w-[25px] h-[25px] stroke-black hover:stroke-[#cc3300] transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110" />
      </button>
    </div>
  );
};
// divs are not focusable by default
// you need to add tabIndex{0}

// dont forget to add curly braces for backticks

// CSS conditional styling issue:
// only defining the selected state leaves unselected items with undefined backgrounds
// this causes inheritance issues and visual bugs
// ❌ Bad - undefined behavior for unselected state
// ${selectedElementId === id ? 'bg-[#adb5bd]' : ''}
// ✅ Good - explicit styling for both selected and unselected states
// ${selectedElementId === id ? 'bg-[#adb5bd]' : 'bg-[#dee2e6]'}

// remember to use arrow functions to pass on functions with onClick
// do not call them immediately with onClick

export default CityItem;
