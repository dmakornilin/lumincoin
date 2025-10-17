import {ValidationUtils} from "./validation-utils.js";
import {SystemUtils} from "./system-utils";
import {HttpUtils} from "./http-utils.js";
import {DateElements} from "./date-elemets.js";


export class ChoiceDataModule {
    constructor() {
        this.flag = null;
        this.is_dtl = false;
        this.flg0Element = null;
        this.flg1Element = null;
        this.flg2Element = null;
        this.flg3Element = null;
        this.flg4Element = null;
        this.flg5Element = null;
        this.dFromElement = null;
        this.dToElement = null;
        this.validations = [];
        this.dataTrans = [];

    }

    toGroup2arr(incArray,costArray) {
        SystemUtils.clearArray(incArray);
        SystemUtils.clearArray(costArray);
           let elm=null;
           let trg=null;
           let result =false;
           let rr=0;
        for (let i = 0; i < this.dataTrans.length; i++) {
            elm=this.dataTrans[i];
            if (elm.type==='income') {
                trg=null; result=false;
                for (let j = 0; j < incArray.length; j++) {
                    if (incArray[j].group===elm.category) {
                        rr=incArray[j].amount+elm.amount;
                        incArray[j].amount=rr;
                        result=true;
                    }
                }
                if (!result) { incArray.push({group:elm.category,amount:elm.amount}) }
            } else {
                trg=null; result=false;
                for (let j = 0; j < costArray.length; j++) {
                    if (costArray[j].group===elm.category) {
                        rr=costArray[j].amount+elm.amount;
                        costArray[j].amount=rr;
                        result=true;
                    }
                }
                if (!result) { costArray.push({group:elm.category,amount:elm.amount}) }

            }



        }


    }


    sbrosChoce() {
        this.flg0Element.classList.remove('btn-secondary')
        this.flg1Element.classList.remove('btn-secondary')
        this.flg2Element.classList.remove('btn-secondary')
        this.flg3Element.classList.remove('btn-secondary')
        this.flg4Element.classList.remove('btn-secondary')
        this.flg5Element.classList.remove('btn-secondary')
    }

    sbrosValidationFlag() {
        this.dFromElement.classList.remove('is-invalid')
        this.dToElement.classList.remove('is-invalid')
    }

    setChoiceFlag() {
        this.sbrosChoce();
        this.sbrosValidationFlag();
        if (this.flag === 0) {
            if (this.flg0Element) {
                this.flg0Element.classList.add('btn-secondary');
                const s0 = DateElements.current_date_iso();
                this.dFromElement.value = s0;
                this.dToElement.value = s0;
            }
        }
        if (this.flag === 1) {
            if (this.flg1Element) {
                this.flg1Element.classList.add('btn-secondary');
                this.dFromElement.value = DateElements.current_week_iso();
                this.dToElement.value = DateElements.current_date_iso();
            }
        }
        if (this.flag === 2) {
            if (this.flg2Element) {
                this.flg2Element.classList.add('btn-secondary');
                this.dFromElement.value = DateElements.current_mes_iso();
                this.dToElement.value = DateElements.current_date_iso();
            }
        }
        if (this.flag === 3) {
            if (this.flg3Element) {
                this.flg3Element.classList.add('btn-secondary');
                this.dFromElement.value = DateElements.current_year_iso();
                this.dToElement.value = DateElements.current_date_iso();
            }
        }
        if (this.flag === 4) {
            if (this.flg4Element) {
                this.flg4Element.classList.add('btn-secondary');
            }
        }
        if (this.flag === 5) {
            if (this.flg5Element) {
                this.flg5Element.classList.add('btn-secondary');
            }
        }
    }

    validate() {
        let result = true;
        if (this.flag === 5) {
            result = ValidationUtils.validateForm(this.validations);
        }
        return result;
    }

    refreshTransact(resp) {
        SystemUtils.clearArray(this.dataTrans);
        for (let i = 0; i < resp.length; i++) {
            this.dataTrans.push(resp[i]);
        }
    }

    async reloadOperations() {
        if (this.validate()  && this.is_dtl) {

            if (this.flag === 4) {
                const result = await HttpUtils.request('/operations/?period=all');
                if (!result.error && result.response) {
                    this.refreshTransact(result.response);
                    return true;
                }
            } else {
            // if (this.flag!==5 ) {
                const result = await HttpUtils.request('/operations/?period=interval&dateFrom='+DateElements.stringRusdtTovalDt(this.dFromElement.value)+'&dateTo='+DateElements.stringRusdtTovalDt(this.dToElement.value));
                if (!result.error && result.response) {
                    this.refreshTransact(result.response);
                    return true;
                }
                return false;
            }
        } else { return false; }
    };


    initial() {
        this.sbrosChoce();
        this.sbrosValidationFlag();
        this.validations = [
            {element: this.dFromElement},
            {element: this.dToElement}
        ];
        this.flg4Element.click();
    }

}