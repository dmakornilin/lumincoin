import {ValidationUtils} from "../../../utils/validation-utils";


export class AddIncomeCategory {
    constructor(openNewRoute, navElement, accElement, navChoice, navBottom) {
        this.openNewRoute = openNewRoute;
        this.navElement = navElement;
        this.accElement = accElement;
        this.navChoice = navChoice;
        this.navBottom = navBottom;
        this.initial();

        this.CategoryName = document.getElementById("add-name");
        this.validations = [
            {element: this.CategoryName}
        ]

        document.getElementById("create-category").addEventListener("click", this.addCategory.bind(this));
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
            this.navBottom.classList.remove("rounded-2");
            this.navBottom.classList.remove("rounded-0");
            this.navBottom.classList.add("rounded-0");
            this.navBottom.dispatchEvent(new Event('click'))
        }
    }


}
