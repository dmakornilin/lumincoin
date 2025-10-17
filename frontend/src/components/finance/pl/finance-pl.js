import {AuthUtils} from "../../../utils/auth-util";
import {NumberUtils} from "../../../utils/number-utils.js";
import {DateElements} from "../../../utils/date-elemets.js";
import config from "../../../config/config.js";

export class FinancePl {
    constructor(openNewRoute, commonParams) {
        this.openNewRoute = openNewRoute;

        if (!AuthUtils.isLogin()) {
            this.openNewRoute('/login');
        } else {
            this.commonParams = commonParams;
            this.tableElement = document.getElementById('pl-table');
            this.removeBtnElement = document.getElementById('remove-button');
            this.removeBtnElement.addEventListener('click', this.removeTransId.bind(this));
            this.initial();
        }
    }

    async removeTransId(element) {
        // console.log("removeTransId="+this.commonParams.transId);
        if (await this.commonParams.deleteTransAct()) {
            this.openNewRoute('/finance-pl');
        }
    }

    initial() {
        if (this.commonParams) {
            this.commonParams.setNavPl();

            const elm0 = document.getElementById('trans-flag-0');
            this.commonParams.transactDataModule.flg0Element = elm0;
            elm0.addEventListener("click", this.setChoiceFlag.bind(this));

            const elm1 = document.getElementById('trans-flag-1');
            this.commonParams.transactDataModule.flg1Element = elm1;
            elm1.addEventListener("click", this.setChoiceFlag.bind(this));

            const elm2 = document.getElementById('trans-flag-2');
            this.commonParams.transactDataModule.flg2Element = elm2;
            elm2.addEventListener("click", this.setChoiceFlag.bind(this));

            const elm3 = document.getElementById('trans-flag-3');
            this.commonParams.transactDataModule.flg3Element = elm3;
            elm3.addEventListener("click", this.setChoiceFlag.bind(this));

            const elm4 = document.getElementById('trans-flag-4');
            this.commonParams.transactDataModule.flg4Element = elm4;
            elm4.addEventListener("click", this.setChoiceFlag.bind(this));

            const elm5 = document.getElementById('trans-flag-5');
            this.commonParams.transactDataModule.flg5Element = elm5;
            elm5.addEventListener("click", this.setChoiceFlag.bind(this));

            this.commonParams.transactDataModule.dFromElement = document.getElementById('trans-date-from');
            this.commonParams.transactDataModule.dToElement = document.getElementById('trans-date-to');
            this.commonParams.transactDataModule.is_dtl = true;
            this.commonParams.transactDataModule.initial();

        }
    }

    async setChoiceFlag(element) {
        const param = this.commonParams.transactDataModule;
        const flg = parseInt(element.srcElement.getAttribute('choice-flag'));
        param.flag = flg;
        param.setChoiceFlag(flg);
        if (await param.reloadOperations()) {
            this.showOperations(param.dataTrans);
        }
    }


    toChoiceTransAct(element) {
         const idTans=parseInt(element.srcElement.getAttribute('id-transact'));
        // console.log(idTans);
        this.commonParams.transId=idTans;


    }

    showOperations(operList) {
        let current = null;
        let ii = 0;
        if (this.tableElement) {
            while (this.tableElement.firstChild) {
                this.tableElement.removeChild(this.tableElement.firstChild);
            }

            if (operList.length >= 1) {
                const captHeadElement = document.createElement('thead');
                const captTrElement = document.createElement('tr');

                let captTh1Element = document.createElement('th');
                captTh1Element.className = "col-2";
                let captTh1H5Element = document.createElement('h5');
                captTh1H5Element.innerText = '№ операции';
                captTh1Element.appendChild(captTh1H5Element);
                captTrElement.appendChild(captTh1Element);

                captTh1Element = document.createElement('th');
                captTh1Element.className = "col-2";
                captTh1H5Element = document.createElement('h5');
                captTh1H5Element.innerText = 'Тип';
                captTh1Element.appendChild(captTh1H5Element);
                captTrElement.appendChild(captTh1Element);

                captTh1Element = document.createElement('th');
                captTh1Element.className = "col-2";
                captTh1H5Element = document.createElement('h5');
                captTh1H5Element.innerText = 'Категория';
                captTh1Element.appendChild(captTh1H5Element);
                captTrElement.appendChild(captTh1Element);

                captTh1Element = document.createElement('th');
                captTh1Element.className = "col-2";
                captTh1H5Element = document.createElement('h5');
                captTh1H5Element.innerText = 'Сумма';
                captTh1Element.appendChild(captTh1H5Element);
                captTrElement.appendChild(captTh1Element);

                captTh1Element = document.createElement('th');
                captTh1Element.className = "col-2";
                captTh1H5Element = document.createElement('h5');
                captTh1H5Element.innerText = 'Дата';
                captTh1Element.appendChild(captTh1H5Element);
                captTrElement.appendChild(captTh1Element);

                captTh1Element = document.createElement('th');
                captTh1Element.className = "col-2";
                captTh1H5Element = document.createElement('h5');
                captTh1H5Element.innerText = 'Комментарий';
                captTh1Element.appendChild(captTh1H5Element);
                captTrElement.appendChild(captTh1Element);

                captHeadElement.appendChild(captTrElement);
                this.tableElement.appendChild(captHeadElement);
            }
            for (let i = operList.length - 1; i >= 0; i--) {
                current = operList[i];
                // console.log(current);
                const trElement = document.createElement('tr');
                ii++;
                const td1Element = document.createElement('td');
                td1Element.innerText = ii;
                trElement.appendChild(td1Element);
                const tdTypeElement = document.createElement('td');
                if (current.type === config.costKey) {
                    tdTypeElement.innerText = 'расход';
                    tdTypeElement.classList.add('text-danger');
                }
                if (current.type === config.incomeKey) {
                    tdTypeElement.innerText = 'доход';
                    tdTypeElement.className = 'text-success';
                }
                trElement.appendChild(tdTypeElement);

                const tdCategoryElement = document.createElement('td');
                if (current.category) {
                    tdCategoryElement.innerText = current.category;
                }
                trElement.appendChild(tdCategoryElement);
                const tdSumElement = document.createElement('td');
                if (current.amount) {
                    tdSumElement.innerText = NumberUtils.numberToStringWithThDiv(current.amount) + '$';
                }
                trElement.appendChild(tdSumElement);
                const tdDataElement = document.createElement('td');
                if (current.date) {
                    tdDataElement.innerText = DateElements.dtStrToString(String(current.date));
                }
                trElement.appendChild(tdDataElement);

                const tdDscElement = document.createElement('td');
                if (current.comment) {
                    tdDscElement.innerText = current.comment;
                }
                trElement.appendChild(tdDscElement);

                const tdActionsElement = document.createElement('td');
                const divActionsElement = document.createElement('div');
                divActionsElement.className = 'd-flex';
                const removeElement = document.createElement('button');
                removeElement.classList.add('border-0');
                removeElement.classList.add('bg-transparent');
                removeElement.setAttribute('type', 'button');
                removeElement.setAttribute('data-bs-toggle', 'modal');
                removeElement.setAttribute('data-bs-target', '#removeTransact');
                const removeIaElement = document.createElement('ia');
                removeIaElement.className = 'fa fa-trash';
                removeIaElement.setAttribute('id-transact', current.id);
                removeIaElement.addEventListener('click', this.toChoiceTransAct.bind(this));

                removeElement.appendChild(removeIaElement);
                divActionsElement.appendChild(removeElement);

                const hrefEditElement = document.createElement('a');

                if (current.type === config.incomeKey) {
                    hrefEditElement.href = '/finance-pl/edit-income';
                } else {
                    hrefEditElement.href = '/finance-pl/edit-cost';
                }
                hrefEditElement.className = 'mx-2';


                const editIaElement = document.createElement('ia');
                editIaElement.className = 'fa fa-pencil';
                editIaElement.setAttribute('id-transact', current.id);
                editIaElement.addEventListener('click', this.toChoiceTransAct.bind(this));

                hrefEditElement.appendChild(editIaElement);
                divActionsElement.appendChild(hrefEditElement);
                tdActionsElement.appendChild(divActionsElement);
                trElement.appendChild(tdActionsElement);
                this.tableElement.appendChild(trElement);
            }
        }
    }

}

