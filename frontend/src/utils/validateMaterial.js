
function validateName(name) {
    if (name.length < 3) {
        return "Name must be at least 3 characters long";
    }
    return "";
}

function validateCategory(category) {
    if (category.length < 3) {
        return "Category must be at least 3 characters long";
    }
    return "";
}

function validateQuantity(quantity) {
    if (quantity < 1) {
        return "Quantity > 1";
    }
    else if (!Number.isInteger(quantity)) {
        return "Quantity should be an integer";
    }
    return "";
}


export function handleBlurName(e, setNameError) {
    if (validateName(e.target.value)) {
        setNameError(validateName(e.target.value));
        setTimeout(() => setNameError(''), 3000);
    } else {
        setNameError('');
    }
}

export function handleBlurCategory(e, setCategoryError) {
    if (validateCategory(e.target.value)) {
        setCategoryError(validateCategory(e.target.value));
        setTimeout(() => setCategoryError(''), 3000);
    } else {
        setCategoryError('');
    }
}

export function handleBlurQuantity(e, setQuantityError) {
    const quantity = parseInt(e.target.value);
    if (validateQuantity(quantity)) {
        setQuantityError(validateQuantity(quantity));
        setTimeout(() => setQuantityError(''), 3000);
    } else {
        setQuantityError('');
    }
}
