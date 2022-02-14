import { useCodeTrafficLightOptions } from "@acnb/options";
import { isPostDetailsPage, isMd } from "../../utils/cnblog";

function createCodeTrafficLight() {
    const trafficLight = $("<div>").addClass("cbt-traffic_light");
    for (let index = 0; index < 3; index++) {
        trafficLight.append($("<span>"));
    }
    return trafficLight;
}

function buildCodeTrafficLight() {
    $("pre code").each(function () {
        $(this).before(createCodeTrafficLight());
    });
}

export function codeTrafficLight(theme, devOptions) {
    const { enable } = useCodeTrafficLightOptions(devOptions);

    if (!enable) return;
    if (!isPostDetailsPage()) return;
    if (!isMd()) return;

    buildCodeTrafficLight();
}
