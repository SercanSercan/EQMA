import './LogRow.scss';
import { ILogRow } from "../../utilities/interfaces.ts";
import LocationLink from "../LocationLink/LocationLink.tsx";
import { formatDate } from "../../utilities/helpers.ts";
import MagnitudeTag from "../MagnitudeTag/MagnitudeTag.tsx";

const LogRow: React.FC<ILogRow> = ({ earthquakeLog }) => {
    const { Depth, Magnitude, Location, Timestamp, Longitude, Latitude } = earthquakeLog;

    return (
        <div className="logRow">
            <div className="logRow__tag-wrapper">
                <MagnitudeTag magnitude={Magnitude} />
            </div>
            <div className="logRow__info">
                <div className="logRow__info__location">
                    <LocationLink location={Location} lat={Latitude} lon={Longitude} />
                </div>
                <div className="logRow__info__other">
                    {formatDate(Timestamp)}, {Depth} km
                </div>
            </div>
        </div>
    );
}

export default LogRow;