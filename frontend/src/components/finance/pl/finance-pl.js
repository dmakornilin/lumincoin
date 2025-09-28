export class FinancePl {
    constructor(openNewRoute,navElement) {
        this.openNewRoute = openNewRoute;
        this.navElement = navElement;
        this.initial();
    }

    initial() {
        if (this.navElement) {
            this.navElement.classList.add('active');
        }
    }
}

