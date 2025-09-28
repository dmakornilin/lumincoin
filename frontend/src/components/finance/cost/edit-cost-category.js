import {ValidationUtils} from "../../../utils/validation-utils";

export class EditCostCategory {
    constructor(openNewRoute, navElement,accElement,navChoice,navBottom) {
        this.openNewRoute = openNewRoute;
        this.CategoryName = document.getElementById("add-name");

        this.navElement = navElement;
        this.accElement = accElement;
        this.navChoice = navChoice;
        this.navBottom = navBottom;
        this.initial();


        this.validations = [
            {element: this.CategoryName}
        ]

        document.getElementById("update-category").addEventListener("click", this.addCategory.bind(this));
    }

    async addCategory() {
        if (ValidationUtils.validateForm(this.validations)) {
            console.log('Прошел валидацию');
        }
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
            this.navBottom.dispatchEvent(new Event('click'))
        }
    }
}
