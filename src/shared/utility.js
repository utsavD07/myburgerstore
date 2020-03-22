export const checkValidity = (value,rules) => {
    let validity = true;

    if(!rules) {
        return true;
    }

    if(rules.required) {
        validity = value.trim() !== '' && validity;
    }

    if(rules.minLength) {
        validity = value.length >= rules.minLength && validity;
    }

    if(rules.maxLength) {
        validity = value.length <= rules.maxLength && validity;
    }
    
    return validity;
};