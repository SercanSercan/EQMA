import './LatestEarthquakes.scss';
import { IEarthQuakeLog, ILatestEarthquakes } from "../../utilities/interfaces.ts";
import { TextInput } from '@fremtind/jokul/components/text-input';
import LogRow from "../LogRow/LogRow.tsx";
import { ChangeEvent, useState } from "react";

const LatestEarthquakes: React.FC<ILatestEarthquakes> = ({ allEarthquakes }) => {
    const [searchText, setSearchText] = useState<string>('');

    const LIMIT = 20;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    let eqLogs:IEarthQuakeLog[] = [];
    if (searchText.trim() === '') {
        eqLogs = allEarthquakes.slice(0, LIMIT);
    } else {
        eqLogs = allEarthquakes.filter((log) => {
            const location = log.Location.toLowerCase();
            const searchTextLowerCase = searchText.toLowerCase();
            return location.indexOf(searchTextLowerCase) > -1;
        });
    }

    return (
      <div className="latestEarthquakes">
          <h2>Latest Earthquakes</h2>
          <TextInput
              label={''}
              onChange={handleChange}
              value={searchText}
              maxLength={30}
              placeholder={'Search location'}
              autoComplete={'off'}
              className={'latestEarthquakes__searchBox'}
          />
          <div className="latestEarthquakes__list">
              {eqLogs.map((earthquake: IEarthQuakeLog, idx) => (
                  <LogRow earthquakeLog={earthquake} key={idx} />
              ))}
          </div>
      </div>
    );
}

export default LatestEarthquakes;