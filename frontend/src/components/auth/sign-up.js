import {AuthUtils} from "../../utils/auth-util.js";
import {HttpUtils} from "../../utils/http-utils.js";
import {ValidationUtils} from "../../utils/validation-utils";


export class SignUp {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        this.nameElement = document.getElementById("login-name");
        this.lastNameElement = document.getElementById("login-last-name");
        this.emailElement = document.getElementById("login-email");
        this.passwordElement = document.getElementById("login-password");
        this.passwordConfirmElement = document.getElementById("login-password-confirm");
        this.commonErrorElement = document.getElementById("login-common-error");

        this.validations = [
            {element: this.nameElement, options: {pattern: ValidationUtils.regularPatterns().name}},
            {element: this.lastNameElement, options: {pattern: ValidationUtils.regularPatterns().name}},
            {element: this.emailElement, options: {pattern: ValidationUtils.regularPatterns().email}},
            {element: this.passwordElement, options: {pattern: ValidationUtils.regularPatterns().password}},
            {element: this.passwordConfirmElement, options: {pattern: ValidationUtils.regularPatterns().password}}
        ]
        document.getElementById("login-process-button").addEventListener("click", this.login.bind(this));

    }

    validateForm() {
        let isValid = ValidationUtils.validateForm(this.validations);
        let psw = this.passwordElement.value;
        if (!ValidationUtils.validateField(this.passwordConfirmElement, {compareTo:psw} )) {
            isValid=false;
        }

        return isValid;
    }


    async login() {
        this.commonErrorElement.style.display = "none";
        if (this.validateForm()) {
            console.log('Прошел валидацию');
        }
    }

}

