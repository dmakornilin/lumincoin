import {AuthUtils} from "../../utils/auth-util.js";
import {HttpUtils} from "../../utils/http-utils.js";

export class Incoms {
    constructor(openNewRoute, commonParams) {
        this.openNewRoute = openNewRoute;
        if (!AuthUtils.isLogin()) {
            this.openNewRoute('/login');
        } else {
            this.commonParams = commonParams;
            this.ctgContainer = document.getElementById("category-container");

             document.getElementById("to-delete-category").addEventListener("click", this.choiceDelCategory.bind(this));



            this.initial();
            return this.loadData();
        }
    }



    initial() {
        if (this.commonParams) {
            this.commonParams.setCtgIncome();
            this.commonParams.navElements.incomeNavBottom.dispatchEvent(new Event('click'))
        }
    }

    showCategories(ctgList) {
        let ctgElement = null;
        for (let i = ctgList.length-1; i >= 0; i--) {
            ctgElement = ctgList[i];
            if (ctgElement.id && ctgElement.title) {
                const currentColElement = document.createElement('div');
                currentColElement.className = 'col';
                const div1Element = document.createElement('div');
                div1Element.classList.add('card');
                div1Element.classList.add('mb-4');
                div1Element.classList.add('rounded-3');
                div1Element.classList.add('pad-top-20');
                div1Element.classList.add('group-block-height');

                currentColElement.appendChild(div1Element);
                const h4Element = document.createElement('h4');
                h4Element.classList.add('my-0');
                h4Element.classList.add('fw-normal');
                h4Element.classList.add('text-group-color');
                h4Element.classList.add('left-20');

                h4Element.innerText = ctgElement.title;
                div1Element.appendChild(h4Element);

                const divFlexElement = document.createElement('div');
                divFlexElement.classList.add('d-flex');
                divFlexElement.classList.add('pad-top-10');
                divFlexElement.classList.add('gap-2');
                divFlexElement.classList.add('left-20');
                div1Element.appendChild(divFlexElement);

                const hrefEditElement = document.createElement('span');
                hrefEditElement.classList.add('btn');
                hrefEditElement.classList.add('btn-block');
                hrefEditElement.classList.add('btn-primary');
                hrefEditElement.innerText='Редактировать';
                hrefEditElement.setAttribute('choice-ctg-id', ctgElement.id);
                hrefEditElement.setAttribute('choice-ctg-name', ctgElement.title);
                hrefEditElement.addEventListener('click', this.toEditCategory.bind(this));

                divFlexElement.appendChild(hrefEditElement);

                const btnDelElement = document.createElement('button');
                btnDelElement.type = 'button';
                btnDelElement.classList.add('btn');
                btnDelElement.classList.add('btn-danger');
                btnDelElement.setAttribute('data-bs-toggle', 'modal');
                btnDelElement.setAttribute('data-bs-target', '#removeGroup');
                btnDelElement.setAttribute('choice-ctg-id', ctgElement.id);
                btnDelElement.setAttribute('choice-ctg-name', ctgElement.title);
                btnDelElement.innerText='Удалить';
                btnDelElement.addEventListener('click', this.toDeleteCategory.bind(this));


                divFlexElement.appendChild(btnDelElement);


                this.ctgContainer.prepend(currentColElement);
            }

        }
    }


   async choiceDelCategory(element) {
       if (this.commonParams.currents.currentIncomeCtg) {
           const result = await HttpUtils.request('/categories/income/' + this.commonParams.currents.currentIncomeCtg, 'DELETE');
           await this.openNewRoute('/incoms');
       }
    }


    toDeleteCategory(element) {
        const choiceCtg=element.srcElement.getAttribute('choice-ctg-id');
        const choiceCtgName=element.srcElement.getAttribute('choice-ctg-name');
        if (choiceCtg) {
            this.commonParams.currents.currentIncomeCtg=choiceCtg;
            this.commonParams.currents.incomeCategory=choiceCtgName;
        }
    }



    toEditCategory(element) {
         const choiceCtg=element.srcElement.getAttribute('choice-ctg-id');
         const choiceCtgName=element.srcElement.getAttribute('choice-ctg-name');

        if (choiceCtg && choiceCtgName) {
            this.commonParams.currents.currentIncomeCtg=choiceCtg;
            this.commonParams.currents.incomeCategory=choiceCtgName;
            this.openNewRoute('/income/edit');
        }

    }

    async  loadData()
    {
        await this.commonParams.reloadIncomeCategories();
        // const result = await HttpUtils.request('/categories/income');
        await this.showCategories(this.commonParams.categories.incomeCategories);
    }

}



