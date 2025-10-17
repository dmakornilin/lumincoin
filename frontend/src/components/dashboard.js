import {AuthUtils} from "../utils/auth-util.js";
import {SystemUtils} from "../utils/system-utils";


export class Dashboard {
    constructor(openNewRoute, commonParams) {
        this.openNewRoute = openNewRoute;
        if (!AuthUtils.isLogin()) {
            this.openNewRoute('/login');
        } else {
            this.commonParams = commonParams;
            this.commonParams.glDataModule.flg0Element = document.getElementById('gl-flag-0');
            this.commonParams.glDataModule.flg1Element = document.getElementById('gl-flag-1');
            this.commonParams.glDataModule.flg2Element = document.getElementById('gl-flag-2');
            this.commonParams.glDataModule.flg3Element = document.getElementById('gl-flag-3');
            this.commonParams.glDataModule.flg4Element = document.getElementById('gl-flag-4');
            this.commonParams.glDataModule.flg5Element = document.getElementById('gl-flag-5');
            this.commonParams.glDataModule.dFromElement = document.getElementById('gl-date-from');
            this.commonParams.glDataModule.dToElement = document.getElementById('gl-date-to');
            this.commonParams.glDataModule.initial();

            this.income = [];
            this.cost = [];
            this.pieCharts = null;
            this.iniFlg = false;

            this.initial();
            // this.iniPi().then();
        }

    }

    async iniPi() {
        await this.startChart();
        this.iniFlg = true;
        console.log(this.pieCharts);
    }


    async startChart() {
        let params = {incPie: null, cstPie: null}
        const {Chart} = await import('../../node_modules/chart.js/auto');
        let income_pie = new Chart(
            document.getElementById('income-pie'),
            {
                type: 'pie',
                data: {
                    labels: this.income.map(row => row.group),
                    datasets: [
                        {
                            label: 'Acquisitions by year',
                            data: this.income.map(row => row.amount),
                            backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"]
                        }
                    ]
                }
            }
        );
        let cost_pie = new Chart(
            document.getElementById('cost-pie'),
            {
                type: 'pie',
                data: {
                    labels: this.cost.map(row => row.group),
                    datasets: [
                        {
                            label: 'Acquisitions by year',
                            data: this.cost.map(row => row.amount),
                            backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"]
                        }
                    ]
                }
            }
        );
        params.incPie = income_pie;
        params.cstPie = cost_pie;
        this.pieCharts = params;
    }


    pieAddData(chart, label, newData) {
        chart.data.labels.push(label);
        chart.data.datasets.forEach((dataset) => {
            dataset.data.push(newData);
        });
    }

    pieRemoveData(chart) {
        while (chart.data.labels.length > 0) {
            chart.data.labels.pop();
            chart.data.datasets.forEach((dataset) => {
                dataset.data.pop();
            });
        }
    }


    async setChoiceFlag(element) {
        const param = this.commonParams.transactDataModule;
        const flg = parseInt(element.srcElement.getAttribute('choice-flag'));
        param.flag = flg;
        param.setChoiceFlag(flg);
        if (await param.reloadOperations()) {
            param.toGroup2arr(this.income, this.cost);
            if (this.iniFlg) {
                this.pieRemoveData(this.pieCharts.incPie);
                for (let ii = 0; ii < this.income.length; ii++) {
                    this.pieAddData(this.pieCharts.incPie, this.income[ii].group, this.income[ii].amount);
                }
                this.pieCharts.incPie.update();

                this.pieRemoveData(this.pieCharts.cstPie);
                for (let jj = 0; jj < this.cost.length; jj++) {
                    this.pieAddData(this.pieCharts.cstPie, this.cost[jj].group, this.cost[jj].amount);
                }
                this.pieCharts.cstPie.update();
            }
        }
    }


    async initial() {
        if (this.commonParams) {
            this.commonParams.setNavMain();

            const elm0 = document.getElementById('gl-flag-0');
            this.commonParams.transactDataModule.flg0Element = elm0;
            elm0.addEventListener("click", this.setChoiceFlag.bind(this));

            const elm1 = document.getElementById('gl-flag-1');
            this.commonParams.transactDataModule.flg1Element = elm1;
            elm1.addEventListener("click", this.setChoiceFlag.bind(this));

            const elm2 = document.getElementById('gl-flag-2');
            this.commonParams.transactDataModule.flg2Element = elm2;
            elm2.addEventListener("click", this.setChoiceFlag.bind(this));

            const elm3 = document.getElementById('gl-flag-3');
            this.commonParams.transactDataModule.flg3Element = elm3;
            elm3.addEventListener("click", this.setChoiceFlag.bind(this));

            const elm4 = document.getElementById('gl-flag-4');
            this.commonParams.transactDataModule.flg4Element = elm4;
            elm4.addEventListener("click", this.setChoiceFlag.bind(this));

            const elm5 = document.getElementById('gl-flag-5');
            this.commonParams.transactDataModule.flg5Element = elm5;
            elm5.addEventListener("click", this.setChoiceFlag.bind(this));

            this.commonParams.transactDataModule.dFromElement = document.getElementById('gl-date-from');
            this.commonParams.transactDataModule.dToElement = document.getElementById('gl-date-to');
            this.commonParams.transactDataModule.is_dtl = true;
            await this.commonParams.transactDataModule.initial();

            await this.iniPi().then();

        }
    }
}