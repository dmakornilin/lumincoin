import {ValidationUtils} from "../../../utils/validation-utils";
import {AuthUtils} from "../../../utils/auth-util";
import {HttpUtils} from "../../../utils/http-utils";

export class EditIncomeCategory {
    constructor(openNewRoute, commonParams) {
        this.openNewRoute = openNewRoute;
        if (!AuthUtils.isLogin()) {
            this.openNewRoute('/login');
        } else {
            this.commonParams = commonParams;
            this.categoryName = document.getElementById("add-name");
            this.initial();
            this.validations = [
                {element: this.categoryName}
            ]
            document.getElementById("update-category").addEventListener("click", this.addCategory.bind(this));
        }
    }

    async addCategory() {
        if (ValidationUtils.validateForm(this.validations)) {
            const result=await HttpUtils.request('/categories/income/'+this.commonParams.currents.currentIncomeCtg,'PUT', true,
                {
                    title: this.categoryName.value,
                });
            if (result.error) {
                this.categoryName.classList.add('is-invalid');
                return;
            } else {
                this.openNewRoute('/incoms');
            }
        }
    }

    initial() {
        if (this.commonParams) {
            this.categoryName.value = this.commonParams.currents.incomeCategory;
            this.commonParams.setCtgIncome();
            this.commonParams.navElements.incomeNavBottom.dispatchEvent(new Event('click'))
        }
    }


}
