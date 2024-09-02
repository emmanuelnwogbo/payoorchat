import * as yup from "yup";

let schema = yup.object().shape({
    email: yup.string().email().required(),
});

const passwordSchema = yup.object().shape({
    password: yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[@$!%*?&]/, 'Password must contain at least one special character @$!%*?&'),
});

export default {
    data() {
        return {
            passwordvisible: false
        }
    },
    methods: {
        async validateemail(email) {
            try {
                const valid = await schema.validate({ email: email });
                return valid;
            } catch (error) {
                console.error(error);
                return false;
            }
        },
        async validatepassword(password) {
            try {
                await passwordSchema.validate({ password });
                this.passwordValid = true;
                this.passwordError = '';
            } catch (error) {
                this.passwordValid = false;
                this.passwordError = error.message;
            }
        },
        errorinput(inputRef) {
            const inputElement = this.$refs[`${inputRef}`];

            if (!inputElement) {
                return false;
            }

            inputElement.classList.add('errorinput');
        },
        togglepasswordvisiblity() {
            this.passwordvisible ? this.passwordvisible = false : this.passwordvisible = true;
        }
    },
    computed: {

    },
    watch: {
        async email(newvalue, oldvalue) {
            const checkemail = await this.validateemail(newvalue);

            if (newvalue.length && checkemail) {
                this.emailError = false;
            } else {
                this.emailError = true;
            }
        },
    }
}