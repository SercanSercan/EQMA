import './TopFive.scss';
import { IEarthQuakeLog, ITopFive } from "../../utilities/interfaces.ts";
import { compare, parseToDate } from "../../utilities/helpers.ts";
import LogRow from "../LogRow/LogRow.tsx";

const TopFive: React.FC<ITopFive> = ({ allEarthquakes }) => {

    const sortByMagnitude = (logs: IEarthQuakeLog[]) => {
        return logs.sort((a, b) => compare(a.Magnitude, b.Magnitude));
    };

    const sortByDate = (logs: IEarthQuakeLog[]) => {
        return logs.sort((a, b) => compare(parseToDate(a.Timestamp), parseToDate(b.Timestamp)));
    }

    const topFiveUnsorted = sortByMagnitude(allEarthquakes).slice(0, 5);
    const topFive = sortByDate(topFiveUnsorted);

    return (
        <div className="topFive">
            <h2>Top 5</h2>
            {topFive.map((earthquake: IEarthQuakeLog, idx) => (
                <LogRow earthquakeLog={earthquake} key={idx} />
            ))}
        </div>
    )
}

export default TopFive;