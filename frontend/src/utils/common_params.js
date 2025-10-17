import {AuthUtils} from "./auth-util.js";
import {HttpUtils} from "./http-utils.js";
import {SystemUtils} from "./system-utils";
import {ChoiceDataModule} from "./choice-data-module.js";
import {NumberUtils} from "./number-utils.js";


export class CommonParams {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        this.glDataModule = new ChoiceDataModule();
        this.transactDataModule = new ChoiceDataModule();


        this.balanceElm = null;
        this.balanceResp = {};


        this.loginInfo = {
            email: null,
            fio: null,
            name: null,
            lastName: null,
            id: null
        };
        this.navElements = {
            startNavElement: null,
            plNavElement: null,
            ctgAccordionElement: null,
            ctgNavElement: null,
            ctgIncomeNavElement: null,
            ctgCostNavElement: null,
            incomeNavBottom: null
        }
        this.currents = {
            currentCostCtg: null,
            costCategory: null,
            currentIncomeCtg: null,
            incomeCategory: null,
        }

        this.categories = {
            incomeCategories: [],
            costCategories: [],
        }

        this.transId = null;
        this.tansIdData = {};
        this.kol = null;
    }


    async reshowBalance() {
        if (this.balanceElm) {
            const result = await HttpUtils.request('/balance');

            this.balanceElm.innerText=NumberUtils.numberToStringWithThDiv(result.response.balance) + '$';
        }
    }

    reloadCategories(ctgList, resp) {
        this.kol = resp.length;
        SystemUtils.clearArray(ctgList);
        for (let i = 0; i < resp.length; i++) {
            ctgList.push(resp[i]);
        }
    }


    finsCategoryByName(ctgList) {
        let elm = ctgList.find(elem => elem.title === this.tansIdData.category);
        if (elm) {
            this.tansIdData.category_id = elm.id;
        }
    }

    findCtgIdIncome() {
        this.finsCategoryByName(this.categories.incomeCategories);
    }

    findCtgIdCost() {
        this.finsCategoryByName(this.categories.costCategories);
    }


    async reloadByTransId() {
        const result = await HttpUtils.request('/operations/' + this.transId, 'GET', true);
        if (result.error || !result.response) {
            return false;
        } else {
            // this.reloadTransInfo(this.tansIdData,result.response)
            this.tansIdData.id = result.response.id;
            this.tansIdData.date = result.response.date;
            this.tansIdData.amount = result.response.amount;
            this.tansIdData.category = result.response.category;
            this.tansIdData.comment = result.response.comment;
            this.tansIdData.category_id = null;
            return true;
        }
    }


    async deleteTransAct() {
        const result = await HttpUtils.request('/operations/' + this.transId, 'DELETE');
        if (result.error) {
            return false;
        } else {
            return true
        }
    }

    async reloadIncomeCategories() {
        const result = await HttpUtils.request('/categories/income');
        await this.reloadCategories(this.categories.incomeCategories, result.response);
        if (result.error || !result.response) {
            return false;
        } else {
            return true;
        }
    }

    async reloadCostCategories() {
        const result = await HttpUtils.request('/categories/expense');
        await this.reloadCategories(this.categories.costCategories, result.response);
        if (result.error || !result.response) {
            return false;
        } else {
            return true;
        }
    }


    refreshUserInfo() {
        const current_user = localStorage.getItem(AuthUtils.userInfoKey);
        if (current_user) {
            const user_info = JSON.parse(current_user);
            this.loginInfo.id = user_info.id;
            this.loginInfo.email = user_info.email;
            this.loginInfo.name = user_info.name;
            this.loginInfo.lastName = user_info.lastName;
            this.loginInfo.fio = user_info.name + ' ' + user_info.lastName;
            // this.loginInfo.fio ='Роман Чернов';
        }
    }

    setCtgCost() {
        this.sbrosChoiceNav();
        if (this.navElements.ctgNavElement) {
            this.navElements.ctgNavElement.classList.add("border-ramka");
        }
        if (this.navElements.ctgCostNavElement) {
            this.navElements.ctgCostNavElement.classList.add("active");
        }
        if (this.navElements.incomeNavBottom) {
            this.navElements.incomeNavBottom.classList.remove("rounded-2");
            this.navElements.incomeNavBottom.classList.remove("rounded-0");
            this.navElements.incomeNavBottom.classList.add("rounded-0");
        }
    }

    setCtgIncome() {
        this.sbrosChoiceNav();
        if (this.navElements.ctgNavElement) {
            this.navElements.ctgNavElement.classList.add("border-ramka");
        }
        if (this.navElements.ctgAccordionElement) {
            this.navElements.ctgAccordionElement.classList.remove("collapse");
        }
        if (this.navElements.ctgIncomeNavElement) {
            this.navElements.ctgIncomeNavElement.classList.add("active");
        }
        if (this.navElements.incomeNavBottom) {
            this.navElements.incomeNavBottom.classList.remove("rounded-2");
            this.navElements.incomeNavBottom.classList.remove("rounded-0");
            this.navElements.incomeNavBottom.classList.add("rounded-0");
        }
    }


    setNavPl() {
        this.sbrosChoiceNav();
        if (this.navElements.plNavElement) {
            this.navElements.plNavElement.classList.add('active');
        }
    }

    setNavMain() {
        this.sbrosChoiceNav();
        if (this.navElements.startNavElement) {
            this.navElements.startNavElement.classList.add('active');
        }
    }


    sbrosChoiceNav() {
        if (this.navElements.ctgNavElement) {
            this.navElements.ctgNavElement.classList.remove('active');
            this.navElements.ctgNavElement.classList.remove('border-ramka');
        }

        if (this.navElements.ctgAccordionElement) {
            this.navElements.ctgAccordionElement.classList.add('collapse');
        }
        if (this.navElements.ctgIncomeNavElement) {
            this.navElements.ctgIncomeNavElement.classList.remove('active');
        }

        if (this.navElements.plNavElement) {
            this.navElements.plNavElement.classList.remove('active');
        }

        if (this.navElements.startNavElement) {
            this.navElements.startNavElement.classList.remove('active');
        }

        if (this.navElements.incomeNavBottom) {
            this.navElements.incomeNavBottom.classList.remove('rounded-2');
            this.navElements.incomeNavBottom.classList.remove('rounded-0');
            this.navElements.incomeNavBottom.classList.add('rounded-2');
        }
    }


}