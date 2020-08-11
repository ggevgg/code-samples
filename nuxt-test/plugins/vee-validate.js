import { extend } from "vee-validate";
import { required, email, min, max } from "vee-validate/dist/rules";
extend("required", {
  ...required,
  message: 'Field is required'
});
extend("email", email);
extend("min", {
  ...min,
  message: 'Minimum password length is 6 symbols'
});
extend("max", {
  ...max,
  message: 'Maximum password length is 32 symbols'
});