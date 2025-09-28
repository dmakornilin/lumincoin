import config from "../config/config.js";
import {HttpUtils} from "../utils/http-utils.js";
import {SystemUtils} from "../utils/system-utils.js";

// import * as name from "../../node_modules/chart.js/dist/chart.js";


export class Dashboard {
    constructor(openNewRoute, navElement) {
        this.openNewRoute = openNewRoute;
        this.navElement = navElement;
        this.initial();


        this.income = [];
        this.cost = [];

        this.loadData().then();

    }

    async loadData() {
        //   очищаю пред значения
        SystemUtils.clearArray(this.income);
        SystemUtils.clearArray(this.cost);
        //  здесь будут данные backend

        //  test debug
        this.income = [
            {group: 'Депозиты', amount: 35000},
            {group: 'Зарплата', amount: 15000},
            {group: 'Сбережения', amount: 25000},
            {group: 'Инвестиции', amount: 45000}
        ];
        this.cost = [
            {group: 'Еда', amount: 7500},
            {group: 'Жильё`', amount: 17500},
            {group: 'Здоровье`', amount: 10250},
            {group: 'Кафе`', amount: 3500},
            {group: 'Авто`', amount: 7200},
            {group: 'Одежда`', amount: 4720},
            {group: 'Развлечения`', amount: 8300},
            {group: 'Счета`', amount: 11200},
            {group: 'Спорт`', amount: 8300}
        ]


        await this.startChart().then();
    }


    async startChart() {
        const {Chart} = await import('../../node_modules/chart.js/auto');
        new Chart(
            document.getElementById('income-pie'),
            {
                type: 'pie',
                data: {
                    labels: this.income.map(row => row.group),
                    datasets: [
                        {
                            label: 'Acquisitions by year',
                            data: this.income.map(row => row.amount)
                        }
                    ]
                }
            }
        )
        new Chart(
            document.getElementById('cost-pie'),
            {
                type: 'pie',
                data: {
                    labels: this.cost.map(row => row.group),
                    datasets: [
                        {
                            label: 'Acquisitions by year',
                            data: this.cost.map(row => row.amount)
                        }
                    ]
                }
            }
        )
    }

    initial() {
        if (this.navElement) {
            this.navElement.classList.add('active');
        }
    }


}