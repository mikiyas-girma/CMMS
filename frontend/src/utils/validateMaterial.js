
export function validateName(name) {
    if (name.length < 3) {
        return "Name must be at least 3 characters long";
    }
    return "";
}

export function validateCategory(category) {
    if (category.length < 3) {
        return "Category must be at least 3 characters long";
    }
    return "";
}

export function validateQuantity(quantity) {
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
        setTimeout(() => setNameError(''), 1500);
    } else {
        setNameError('');
    }
}

export function handleBlurCategory(e, setCategoryError) {
    if (validateCategory(e.target.value)) {
        setCategoryError(validateCategory(e.target.value));
        setTimeout(() => setCategoryError(''), 1500);
    } else {
        setCategoryError('');
    }
}

export function handleBlurQuantity(e, setQuantityError) {
    const quantity = parseInt(e.target.value);
    if (validateQuantity(quantity)) {
        setQuantityError(validateQuantity(quantity));
        setTimeout(() => setQuantityError(''), 1500);
    } else {
        setQuantityError('');
    }
}
