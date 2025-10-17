import {ValidationUtils} from "../../../utils/validation-utils";
import {HttpUtils} from "../../../utils/http-utils";

export class PlCostEdit {
    constructor(openNewRoute, commonParams) {
        this.openNewRoute = openNewRoute;
        this.commonParams = commonParams;
        this.initial();


        this.categoryElement = document.getElementById("categ-select");
        this.dateElement = document.getElementById("dateInput");
        this.amountElement = document.getElementById("amountInput");
        this.commentElement = document.getElementById("descriptionInput");
        this.commonErrorElement = document.getElementById("form-select");
        this.commonErrorElement.classList.remove('is-invalid');

        this.validations = [
            {element: this.categoryElement},
            {element: this.dateElement},
            {element: this.amountElement},
            {element: this.commentElement}
        ]
        document.getElementById("update").addEventListener("click", this.updateTransact.bind(this));
        this.upd_data = { type : "expense" };
    }

    checkParamsToUpdate() {
        let result = false;
        this.upd_data.date = this.dateElement.value;
        if (this.dateElement.value !== this.commonParams.tansIdData.date) {
            result = true;
        }
        let new_ktg = parseInt(this.categoryElement.value);
        this.upd_data.category_id = new_ktg;
        if (new_ktg !== this.commonParams.tansIdData.category_id) {
            result = true;
        }
        let new_sum = parseInt(this.amountElement.value);
        this.upd_data.amount = new_sum;
        if (new_sum !== this.commonParams.tansIdData.amount) {
            result = true;
        }
        this.upd_data.comment = this.commentElement.value;
        if (this.commentElement.value !== this.commonParams.tansIdData.comment) {
            result = true;
        }
        return result;
    }

    async updateTransact() {
        this.commonErrorElement.classList.remove('is-invalid');
        if (ValidationUtils.validateForm(this.validations)) {
            if (this.checkParamsToUpdate()) {
                console.log(this.upd_data);
                let trans_id=this.commonParams.transId;
                console.log(trans_id);
                const result = await HttpUtils.request('/operations/' + trans_id, 'PUT', true, this.upd_data);
                if (result.error) {
                    this.commonErrorElement.classList.add('is-invalid');
                } else {
                    this.openNewRoute('/finance-pl');
                }


            } else {
                this.openNewRoute('/finance-pl');
            }
        } else {
            this.commonErrorElement.classList.add('is-invalid');
        }
    }


    showCategories(ctgList) {
        let ctgElement = null;
        let sel_ctg = this.commonParams.tansIdData.category_id;
        for (let i = 0; i < ctgList.length; i++) {
            ctgElement = ctgList[i];
            if (ctgElement.id && ctgElement.title) {
                const optionElement = document.createElement('option');
                optionElement.innerText = ctgElement.title;
                optionElement.setAttribute('value', ctgElement.id);
                if (sel_ctg && sel_ctg === ctgElement.id) {
                    optionElement.setAttribute('selected', 'true')
                }
                ;
                this.categoryElement.appendChild(optionElement);
            }
        }
    }


    showParams() {
        this.dateElement.value = this.commonParams.tansIdData.date;
        this.amountElement.value = this.commonParams.tansIdData.amount;
        this.commentElement.value = this.commonParams.tansIdData.comment;
    }

    async initial() {
        if (this.commonParams) {
            this.commonParams.setNavPl();
            if (await this.commonParams.reloadByTransId()) {
                if (await this.commonParams.reloadCostCategories()) {
                    this.commonParams.findCtgIdCost();
                    this.showCategories(this.commonParams.categories.costCategories);
                    this.showParams();
                }
            }
        }
    }

}
