import {Dashboard} from "./components/dashboard.js";
import {FileUtils} from "./utils/file-utils.js";
import {Login} from "./components/auth/login.js";
import {Logout} from "./components/auth/logout.js";
import {SignUp} from "./components/auth/sign-up.js";
import {Incoms} from "./components/finance/incoms.js";
import {Costs} from "./components/finance/costs.js";
import {AddIncomeCategory} from "./components/finance/income/add-income-category.js";
import {EditIncomeCategory} from "./components/finance/income/edit-income-category.js";
import {AddCostCategory} from "./components/finance/cost/add-cost-category.js";
import {EditCostCategory} from "./components/finance/cost/edit-cost-category.js";
import {FinancePl} from "./components/finance/pl/finance-pl.js";
import {PlIncomeAdd} from "./components/finance/pl/pl-income-add.js";
import {PlCostAdd} from "./components/finance/pl/pl-cost-add.js";
import {PlIncomeEdit} from "./components/finance/pl/pl-income-edit.js";
import {PlCostEdit} from "./components/finance/pl/pl-cost-edit.js";
import {CommonParams} from "./utils/common_params";


export class Router {
    constructor() {
        this.titlePageElement = document.getElementById('title');
        this.contentPageElement = document.getElementById('content');
        this.commonParams = new CommonParams(this.openNewRoute.bind(this));
        this.initEvents();
        this.routes = [
            {
                route: '/',
                title: 'Дашбоард',
                filePathTemplate: '/templates/pages/dashboard.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Dashboard(this.openNewRoute.bind(this), this.commonParams);
                },
            },
            {
                route: '/404',
                title: 'Страница не найдена',
                filePathTemplate: '/templates/pages/404.html',
                useLayout: false,
            },
            {
                route: '/login',
                title: 'Авторизация',
                filePathTemplate: '/templates/pages/auth/login.html',
                useLayout: false,
                load: () => {
                    const loginApp = new Login(this.openNewRoute.bind(this));
                },
            },
            {
                route: '/logout',
                load: () => {
                    new Logout(this.openNewRoute.bind(this));
                },
            },
            {
                route: '/sign-up',
                title: 'Регистрация',
                filePathTemplate: '/templates/pages/auth/sign-up.html',
                useLayout: false,
                load: () => {
                    const signUpApp = new SignUp(this.openNewRoute.bind(this));
                },
            },
            {
                route: '/finance-pl',
                title: 'Доходы и расходы',
                filePathTemplate: '/templates/pages/finance/pl/show.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new FinancePl(this.openNewRoute.bind(this), this.commonParams);
                },
            },
            {
                route: '/finance-pl/add-income',
                title: 'Создание дохода',
                filePathTemplate: '/templates/pages/finance/pl/add-income.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new PlIncomeAdd(this.openNewRoute.bind(this), this.commonParams);
                },
            },
            {
                route: '/finance-pl/edit-income',
                title: 'Редактирование дохода',
                filePathTemplate: '/templates/pages/finance/pl/edit-income.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new PlIncomeEdit(this.openNewRoute.bind(this), this.commonParams);
                },
            },
            {
                route: '/finance-pl/add-cost',
                title: 'Создание расхода',
                filePathTemplate: '/templates/pages/finance/pl/add-cost.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new PlCostAdd(this.openNewRoute.bind(this), this.commonParams);
                },
            },
            {
                route: '/finance-pl/edit-cost',
                title: 'Редактирование расхода',
                filePathTemplate: '/templates/pages/finance/pl/edit-cost.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new PlCostEdit(this.openNewRoute.bind(this), this.commonParams);
                },
            },
            {
                route: '/incoms',
                title: 'Доходы',
                filePathTemplate: '/templates/pages/finance/income/category_show.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Incoms(this.openNewRoute.bind(this), this.commonParams);
                },
            },
            {
                route: '/income/add',
                title: 'Создание категории доходов',
                filePathTemplate: '/templates/pages/finance/income/add.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new AddIncomeCategory(this.openNewRoute.bind(this), this.commonParams);
                },
            },
            {
                route: '/income/edit',
                title: 'Редактирование категории доходов',
                filePathTemplate: '/templates/pages/finance/income/edit.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new EditIncomeCategory(this.openNewRoute.bind(this), this.commonParams);
                },
            },
            {
                route: '/costs',
                title: 'Расходы',
                filePathTemplate: '/templates/pages/finance/cost/category_show.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Costs(this.openNewRoute.bind(this), this.commonParams);
                },
            },
            {
                route: '/cost/add',
                title: 'Добавление категории расходов',
                filePathTemplate: '/templates/pages/finance/cost/add.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new AddCostCategory(this.openNewRoute.bind(this), this.commonParams);
                },
            },
            {
                route: '/cost/edit',
                title: 'Редактирование категории расходов',
                filePathTemplate: '/templates/pages/finance/cost/edit.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new EditCostCategory(this.openNewRoute.bind(this), this.commonParams);
                },
            },
        ]
    }


    initEvents() {
        window.addEventListener('DOMContentLoaded', this.activateRoute.bind(this)); // загрузка веб приложения
        window.addEventListener('popstate', this.activateRoute.bind(this)); // смена url
        document.addEventListener('click', this.clickHandler.bind(this));

    }

    async openNewRoute(url) {
        const currentRoute = window.location.pathname;
        history.pushState({}, '', url);
        await this.activateRoute(null, currentRoute);
    }

    async clickHandler(e) {
        let element = null;

        if (e.target.nodeName === 'BUTTON') {
            e.preventDefault();
            return;
        }

        if (e.target.nodeName === 'A') {
            element = e.target;
        } else {
            if (e.target.parentNode.nodeName === 'A') {
                element = e.target.parentNode;
            }
        }

        if (element) {
            e.preventDefault();
            const currentRoute = window.location.pathname;
            const url = element.href.replace(window.location.origin, '');
            console.log('currentRoute=' + currentRoute);
            console.log('url=' + url);
            if (!url || (currentRoute === url.replace('#', '')) || url.startsWith('javascript:void(0)')) {
                return (0);
            }
            await this.openNewRoute(url);
        }
    }


    async activateRoute(e, oldRoute = null) {

        if (oldRoute) {
            const currentRoute = this.routes.find(item => item.route === oldRoute);
            if (currentRoute.styles && currentRoute.styles.length > 0) {
                currentRoute.styles.forEach(style => {
                    let dd = document.querySelector(`link[href='./css/${style}']`);
                    if (dd) {
                        dd.remove();
                    }
                });
            }
            if (currentRoute.scripts && currentRoute.scripts.length > 0) {
                currentRoute.scripts.forEach(oldScript => {
                    let dd = document.querySelector(`script[src='./js/${oldScript}']`);
                    if (dd) {
                        dd.remove();
                    }
                });
            }
            if (currentRoute.unload && typeof currentRoute.unload === 'function') {
                currentRoute.unload();
            }
        }

        const urlRoute = window.location.pathname;
        const newRoute = this.routes.find(item => item.route === urlRoute);


        if (newRoute) {
            if (newRoute.styles && newRoute.styles.length > 0) {
                newRoute.styles.forEach(style => {
                    FileUtils.LoadPageStyle('/css/' + style, this.admiLteStyleElement);
                });
            }

            if (newRoute.scripts && newRoute.scripts.length > 0) {
                for (const script of newRoute.scripts) {
                    await FileUtils.LoadPageScript('/js/' + script);
                }
            }


            if (newRoute.title) {
                this.titlePageElement.innerText = newRoute.title + ' | Lumincoin Finance';
            }

            if (newRoute.filePathTemplate) {
                // document.body.className = '';

                let contentBlock = this.contentPageElement;

                if (newRoute.useLayout) {
                    this.contentPageElement.innerHTML = await fetch(newRoute.useLayout).then(response => response.text());
                    contentBlock = document.getElementById('content-layout');
                    document.body.classList.add('sidebar-mini');
                    document.body.classList.add('layout-fixed');
                    await this.iniLoad();
                } else {
                    document.body.classList.remove('sidebar-mini');
                    document.body.classList.remove('layout-fixed');
                }
                contentBlock.innerHTML = await fetch(newRoute.filePathTemplate).then(response => response.text());
            }

            if (newRoute.load && typeof newRoute.load === 'function') {
                newRoute.load();
                return;
            }
        }  ///  newRoute
        else {
            console.log('No roots found.');
            history.pushState({}, '', '/404');
            await this.activateRoute();
        }
    }

    async iniLoad() {
        if (this.commonParams) {
            this.commonParams.navElements.ctgNavElement = document.getElementById('menu-category');
            this.commonParams.navElements.ctgAccordionElement = document.getElementById('item-1');
            this.commonParams.navElements.ctgIncomeNavElement = document.getElementById('list-incoms');
            this.commonParams.navElements.incomeNavBottom = document.getElementById('income-nav-bottom');
            this.commonParams.navElements.ctgCostNavElement = document.getElementById('list-costs');
            this.commonParams.navElements.plNavElement = document.getElementById('finance-pl');
            this.commonParams.navElements.startNavElement = document.getElementById('start-choice');
            this.commonParams.sbrosChoiceNav();
            this.commonParams.refreshUserInfo();
            this.commonParams.balanceElm = document.getElementById('balance-amount');

            if (this.commonParams.loginInfo.fio) {
                document.getElementById('login-name').innerText = this.commonParams.loginInfo.fio;
            }
            this.commonParams.reshowBalance();
        }
    }


}


