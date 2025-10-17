import {AuthUtils} from "../../../utils/auth-util.js";
import {HttpUtils} from "../../../utils/http-utils.js";
import {ValidationUtils} from "../../../utils/validation-utils.js";

export class EditCostCategory {
    constructor(openNewRoute, commonParams) {
        this.openNewRoute = openNewRoute;
        if (!AuthUtils.isLogin()) {
            this.openNewRoute('/login');
        } else {
            this.categoryName = document.getElementById("add-name");
            this.commonParams = commonParams;
            this.initial();
            this.validations = [
                {element: this.categoryName}
            ]

            document.getElementById("update-category").addEventListener("click", this.addCategory.bind(this));
        }
    }

    async addCategory() {
        if (ValidationUtils.validateForm(this.validations)) {
            console.log('Прошел валидацию');
            if (ValidationUtils.validateForm(this.validations)) {
                const result = await HttpUtils.request('/categories/expense/' + this.commonParams.currents.currentCostCtg, 'PUT', true,
                    {
                        title: this.categoryName.value,
                    });
                if (result.error) {
                    this.categoryName.classList.add('is-invalid');
                    return;
                } else {
                    this.openNewRoute('/costs');
                }
            }
        }
    }

    initial() {
        if (this.commonParams) {
            this.categoryName.value = this.commonParams.currents.costCategory;
            this.commonParams.setCtgCost();
            this.commonParams.navElements.incomeNavBottom.dispatchEvent(new Event('click'))
        }
    }
}
