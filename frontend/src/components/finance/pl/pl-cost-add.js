import {ValidationUtils} from "../../../utils/validation-utils";
import {AuthUtils} from "../../../utils/auth-util";
import {HttpUtils} from "../../../utils/http-utils";

export class PlCostAdd {
    constructor(openNewRoute, commonParams) {
        this.openNewRoute = openNewRoute;

        if (AuthUtils.isLogin()) {

            this.commonParams = commonParams;
            this.initial();
            this.categoryElement = document.getElementById("categ-select");
            this.dateElement = document.getElementById("dateInput");
            this.amountElement = document.getElementById("amountInput");
            this.commonErrorElement = document.getElementById("form-select");
            this.commentElement = document.getElementById("descriptionInput");
            this.commonErrorElement.classList.remove('is-invalid');

            this.validations = [
                {element: this.categoryElement},
                {element: this.dateElement},
                {element: this.amountElement},
                {element: this.commentElement}
            ]
            document.getElementById("create").addEventListener("click", this.addTransact.bind(this));
            this.loadData();
        } else {
            this.openNewRoute('/login');
        }
    }

    async addTransact() {
        this.commonErrorElement.classList.remove('is-invalid');
        if (ValidationUtils.validateForm(this.validations)) {
            if (await this.saveTransact()) {
                this.openNewRoute('/finance-pl');
            }
            this.commonErrorElement.classList.add("is-invalid");
        } else {
            this.commonErrorElement.classList.add('is-invalid');
        }
    }

    async saveTransact() {
        const result = await HttpUtils.request('/operations', 'POST', true,
            {
                type: 'expense',
                amount: this.amountElement.value,
                date: this.dateElement.value,
                comment: this.commentElement.value,
                category_id: parseInt(this.categoryElement.value),
            });
        if (result.error) {
            return false;
        } else {
            return true
        }
    }


    initial() {
        if (this.commonParams) {
            this.commonParams.setNavPl();
        }
    }

    showCategories(ctgList) {
        let ctgElement = null;
        for (let i = 0; i < ctgList.length; i++) {
            ctgElement = ctgList[i];
            if (ctgElement.id && ctgElement.title) {
                const optionElement = document.createElement('option');
                optionElement.innerText = ctgElement.title;
                optionElement.setAttribute('value', ctgElement.id);
                if (i === 0) {
                    optionElement.setAttribute('selected', 'true');
                }
                this.categoryElement.appendChild(optionElement);
            }
        }
    }


    async loadData() {
        if (await this.commonParams.reloadCostCategories()) {
            await this.showCategories(this.commonParams.categories.costCategories);
        }
    }
}
