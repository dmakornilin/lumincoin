import {AuthUtils} from "../../../utils/auth-util";
import {HttpUtils} from "../../../utils/http-utils";
import {NumberUtils} from "../../../utils/number-utils.js";
import {DateElements} from "../../../utils/date-elemets.js";
import config from "../../../config/config.js";

export class FinancePl {
    constructor(openNewRoute, navElement) {
        this.openNewRoute = openNewRoute;

        if (!AuthUtils.isLogin()) {
            this.openNewRoute('/login');
        } else {
            this.navElement = navElement;
            this.tableElement = document.getElementById('pl-table')
            this.initial();
            return this.loadData();
        }
    }

    initial() {
        if (this.navElement) {
            this.navElement.classList.add('active');
        }
    }

    showOperations(operList) {
        let current = null;
        let ii = 0;
        if (this.tableElement) {
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
                removeElement.setAttribute('value', current.id);
                const removeIaElement = document.createElement('ia');
                removeIaElement.className = 'fa fa-trash';
                removeElement.appendChild(removeIaElement);
                divActionsElement.appendChild(removeElement);

                const hrefEditElement = document.createElement('a');
                  hrefEditElement.href = '/finance-pl/edit-income';
                  hrefEditElement.setAttribute('value', current.id);
                  hrefEditElement.className = 'mx-2';
                const editIaElement = document.createElement('ia');
                editIaElement.className = 'fa fa-pencil';
                hrefEditElement.appendChild(editIaElement);
                divActionsElement.appendChild(hrefEditElement);
                tdActionsElement.appendChild(divActionsElement);
                trElement.appendChild(tdActionsElement);
                this.tableElement.appendChild(trElement);
            }
        }
    }


    async loadData() {
        const result = await HttpUtils.request('/operations/?period=all');
        await this.showOperations(result.response);
    }
}

