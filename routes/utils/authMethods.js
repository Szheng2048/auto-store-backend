

/**
 * Checks if a given string is empty.
 */
function isEmpty(str) {
    return str.length === 0
}

/**
 * Checks if a given string meets the criteria of a strong password.
 */
function isStrongPassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/          .test(password);
    const hasLowerCase = /[a-z]/          .test(password);
    const hasNumber = /[0-9]/             .test(password);
    const hasSpecialChars = /[^A-Za-z0-9]/.test(password);
    if(password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChars){
        return true
    }else{
        return false
    }
    // Implementation here
}

function isEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isAlpha(str) {
    const hasUpperOrLowerCase = /[^A-Za-z]/.test(str)
    return !hasUpperOrLowerCase
}

function isAlphanumeric(str) {
    // Implementation here
    const hasUpperOrLowerCaseOrNumber = /[^A-Za-z0-9]/.test(str)
    return !hasUpperOrLowerCaseOrNumber
}

function isPhoneNumber(str) {
    const isValid = /^\d{10}$/.test(str)
    return isValid
}

module.exports = {
    isEmail,
    isEmpty,
    isAlpha,
    isAlphanumeric, 
    isStrongPassword,
    isPhoneNumber
}