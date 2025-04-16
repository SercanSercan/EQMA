import { IMagnitude } from "../../utilities/interfaces.ts";
import { ErrorTag, InfoTag, SuccessTag, Tag, WarningTag } from "@fremtind/jokul";

const MagnitudeTag: React.FC<IMagnitude> = ({ magnitude }) => {

    let magStr = magnitude.toString();
    if (magStr.length === 1) {
        magStr = magStr + '.0';
    }

    const mag = parseFloat(magStr);

    if (mag < 2) {
        return <SuccessTag>{magStr}</SuccessTag>;
    } else if (mag >= 2 && mag < 4) {
        return <Tag>{magStr}</Tag>;
    }
    else if (mag >= 4 && mag < 5.5) {
        return <InfoTag>{magStr}</InfoTag>;
    }
    else if (mag >= 5.5 && mag < 6.4) {
        return <WarningTag>{magStr}</WarningTag>;
    }
    else {
        return <ErrorTag>{magStr}</ErrorTag>;
    }
}

export default MagnitudeTag;