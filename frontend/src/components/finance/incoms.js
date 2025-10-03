import {AuthUtils} from "../../utils/auth-util.js";
import {HttpUtils} from "../../utils/http-utils.js";


export class Incoms {
    constructor(openNewRoute, navElement,accElement,navChoice,navBottom) {
        this.openNewRoute = openNewRoute;
        this.navElement = navElement;
        this.accElement = accElement;
        this.navChoice = navChoice;
        this.navBottom = navBottom;
        this.initial();
    }

    initial() {
        if (this.navElement) {
            this.navElement.classList.add("border-ramka");
        }
        if (this.accElement) {
            this.accElement.classList.remove("collapse");
        }
        if (this.navChoice) {
            this.navChoice.classList.add("active");
        }
        if (this.navBottom) {
            this.navBottom.classList.remove("rounded-2");
            this.navBottom.classList.remove("rounded-0");
            this.navBottom.classList.add("rounded-0");
            this.navBottom.dispatchEvent(new Event('click'))
        }
    }
}



