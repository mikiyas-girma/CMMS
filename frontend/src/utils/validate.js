// utils/validate.js

export function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
}

export function validatePassword(password) {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,13}$/;
    return re.test(password);
}


export function handleBlurEmail(e, setError) {
    if (!validateEmail(e.target.value)) {
        setError("Please enter valid email");
        setTimeout(() => setError(''), 3000); 
    } else {
        setError('');
    }
};

export function handleBlurPassword(e, setError) {
    if (!validatePassword(e.target.value)) {
        setError("Password must contain at least 5 characters");
        setTimeout(() => setError(''), 3000);
    } else {
        setError('');
    }
};
