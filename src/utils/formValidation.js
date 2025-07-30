
export const formValidation = (email, password) => {
    const emailCheck = email.includes('@') && email.includes('.com');

    const isLongEnough = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    const passwordCheck = isLongEnough && hasUppercase && hasLowercase && hasDigit && hasSpecialChar;

    return emailCheck && passwordCheck;
};
