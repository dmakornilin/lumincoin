import {ValidationUtils} from "../../../utils/validation-utils";

export class PlCostEdit {
    constructor(openNewRoute, navElement) {
        this.openNewRoute = openNewRoute;
        this.navElement = navElement;
        this.initial();


        this.categoryElement = document.getElementById("categ-select");
        this.dateElement = document.getElementById("dateInput");
        this.amountElement = document.getElementById("amountInput");
        this.validations = [
            {element: this.categoryElement},
            {element: this.dateElement},
            {element: this.amountElement}
        ]
        document.getElementById("update").addEventListener("click", this.addTransact.bind(this));
    }

    async addTransact() {
        if (ValidationUtils.validateForm(this.validations)) {
            console.log('Прошел валидацию');
        }
    }

    initial() {
        if (this.navElement) {
            this.navElement.classList.add('active');
        }
    }

}
