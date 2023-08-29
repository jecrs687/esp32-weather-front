
import { getBackground } from "@/utils/getBackground";
// @ts-ignore
import Thermometer from "react-thermometer-chart";


const ThermComponent = ({
    temp
}:{
    temp: number
}) => {
    return <Thermometer
    width="150px"
    height="250px"
    steps={5}
    color={
        "rgb(" + getBackground(temp) + ")"
    }
    minValue={0}
    maxValue={45}
    currentValue={temp}
/>
}
export default ThermComponent;