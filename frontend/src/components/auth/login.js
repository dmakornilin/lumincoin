import {AuthUtils} from "../../utils/auth-util.js";
import {HttpUtils} from "../../utils/http-utils.js";
import {ValidationUtils} from "../../utils/validation-utils";


export class Login {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        // console.log(openNewRoute);
        // if ( AuthUtils.getAuthInfo(AuthUtils.accessTokenKey) ) {
        //     return this.openNewRoute('/');
        // }
        this.emailElement = document.getElementById("login-email");
        this.passwordElement = document.getElementById("login-password");
        this.commonErrorElement = document.getElementById("login-common-error");

        this.validations = [
            {element: this.emailElement, options: {pattern: ValidationUtils.regularPatterns().email}},
            {element: this.passwordElement, options: {pattern: ValidationUtils.regularPatterns().password}}
        ];

        document.getElementById("login-process-button").addEventListener("click", this.login.bind(this));
    }

    async login() {
        this.commonErrorElement.style.display = "none";
        if (ValidationUtils.validateForm(this.validations)) {
            console.log('Прошел валидацию');
        }
    }


}

