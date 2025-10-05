import {AuthUtils} from "../../utils/auth-util.js";
import {HttpUtils} from "../../utils/http-utils.js";
import {ValidationUtils} from "../../utils/validation-utils";


export class SignUp {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        if (AuthUtils.getAuthInfo(AuthUtils.accessTokenKey)) {
            return this.openNewRoute('/');
        }

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
        if (!ValidationUtils.validateField(this.passwordConfirmElement, {compareTo: psw})) {
            isValid = false;
        }

        return isValid;
    }


    async login() {
        this.commonErrorElement.style.display = "none";
        if (this.validateForm()) {
            const result = await HttpUtils.request('/signup', 'POST', false,
                {
                    name: this.nameElement.value,
                    lastName: this.lastNameElement.value,
                    email: this.emailElement.value,
                    password: this.passwordElement.value,
                    passwordRepeat: this.passwordConfirmElement.value
                });
            const loginResult = await await HttpUtils.request('/login', 'POST', false,
                {
                    email: this.emailElement.value,
                    password: this.passwordElement.value,
                    rememberMe: true,
                });

            if (loginResult.error || !loginResult.response || (loginResult.response && (!loginResult.response.tokens.accessToken || !loginResult.response.tokens.refreshToken || !loginResult.response.user.id || !loginResult.response.user.name))) {
                this.commonErrorElement.style.display = "block";
                return;
            }
            AuthUtils.setAuthInfo(loginResult.response.tokens.accessToken, loginResult.response.tokens.refreshToken, {
                id: loginResult.response.user.id,
                name: loginResult.response.user.name,
                lastName: this.lastNameElement.value,
                email: this.emailElement.value
            });
            this.openNewRoute('/');
        }
    }

}

