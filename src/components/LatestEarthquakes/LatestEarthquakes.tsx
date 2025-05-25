import './LatestEarthquakes.scss';
import { IEarthQuakeLog, ILatestEarthquakes } from "../../utilities/interfaces.ts";
import { TextInput } from '@fremtind/jokul/components/text-input';
import LogRow from "../LogRow/LogRow.tsx";
import { ChangeEvent, useEffect, useState } from "react";

const LatestEarthquakes: React.FC<ILatestEarthquakes> = ({ allEarthquakes }) => {
    const [searchText, setSearchText] = useState<string>('');
    const [eqLogs, setEqLogs] = useState<IEarthQuakeLog[]>(allEarthquakes);

    const LIMIT = 20;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    useEffect(() => {
        if (searchText.trim() === '') {
            setEqLogs(allEarthquakes.slice(0, LIMIT));
        } else {
            const someLogs = allEarthquakes.filter((log) => {
                const location = log.Location.toLowerCase();
                const searchTextLower = searchText.toLowerCase();
                return location.indexOf(searchTextLower) > -1;
            });
            setEqLogs(someLogs);
        }
    }, [searchText]);

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