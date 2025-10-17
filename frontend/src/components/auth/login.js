import {AuthUtils} from "../../utils/auth-util.js";
import {HttpUtils} from "../../utils/http-utils.js";
import {ValidationUtils} from "../../utils/validation-utils";


export class Login {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        console.log(openNewRoute);
        if ( AuthUtils.getAuthInfo(AuthUtils.accessTokenKey) ) {
            return this.openNewRoute('/');
        }
        this.emailElement = document.getElementById("login-email");
        this.passwordElement = document.getElementById("login-password");
        this.commonErrorElement = document.getElementById("login-common-error");
        this.rememberMeElement = document.getElementById("login-remember-me");

        this.validations = [
            {element: this.emailElement, options: {pattern: ValidationUtils.regularPatterns().email}},
            {element: this.passwordElement, options: {pattern: ValidationUtils.regularPatterns().password}}
        ];
        document.getElementById("login-process-button").addEventListener("click", this.login.bind(this));
    }

    async login() {
        this.commonErrorElement.style.display = "none";
        if (ValidationUtils.validateForm(this.validations)) {
            // console.log('Прошел валидацию');
            const result=await HttpUtils.request('/login','POST', false,
                {
                    email: this.emailElement.value,
                    password: this.passwordElement.value,
                    rememberMe: this.rememberMeElement.checked,
                });
            if (result.error || !result.response || ( result.response && (!result.response.tokens.accessToken || !result.response.tokens.refreshToken || !result.response.user.id || !result.response.user.name) )  ) {
                this.commonErrorElement.style.display = "block";
                return;
            }
            AuthUtils.setAuthInfo(result.response.tokens.accessToken, result.response.tokens.refreshToken,{id: result.response.user.id, name: result.response.user.name, lastName: result.response.user.lastName, email: this.emailElement.value});


            this.openNewRoute('/');
        }
    }
}

