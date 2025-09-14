export class ValidationUtils {

    static regularPatterns() {
        let ptr = {
            email: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/,
            password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
            name: /^[А-Я][А-Яа-яё\s]*$/
    }
        return ptr;
    }

    static validateForm(validations) {
        let isValid = true;
        for (let i = 0; i < validations.length; i++) {
            if (!this.validateField(validations[i].element, validations[i].options)) {
                isValid = false;
            }
            console.log(validations[i]);
        }
        return isValid;
    }


    static validateField(element, options) {
        let condition = element.value;

        if (options) {
            if (options.hasOwnProperty('pattern')) {
                condition = element.value && element.value.match(options.pattern);
            } else if (options.hasOwnProperty('compareTo')) {
                condition = element.value && element.value === options.compareTo;
            }
        }

        if (condition) {
            element.classList.remove('is-invalid');
            return true;
        } else {
            element.classList.add('is-invalid');
            return false;
        }
    }
}

