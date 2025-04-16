import './LatestEarthquakes.scss';
import { IEarthQuakeLog, ILatestEarthquakes } from "../../utilities/interfaces.ts";
import LogRow from "../LogRow/LogRow.tsx";

const LatestEarthquakes: React.FC<ILatestEarthquakes> = ({ allEarthquakes }) => {
    const LIMIT = 20;

    return (
      <div className="latestEarthquakes">
          <h2>Latest Earthquakes</h2>
          <div className="latestEarthquakes__list">
              {allEarthquakes.slice(0, LIMIT).map((earthquake: IEarthQuakeLog, idx) => (
                  <LogRow earthquakeLog={earthquake} key={idx} />
              ))}
          </div>
      </div>
    );
}

export default LatestEarthquakes;