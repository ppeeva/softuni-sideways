
const validateSideway = (sidewayData) => {
    let errors = {};

    if (!sidewayData.title || sidewayData.title.length < 3 || sidewayData.title.length > 50) {
        errors.title = "Title must be between 3 and 50 characters long!";
    }

    if (!sidewayData.location || sidewayData.location.length < 3 || sidewayData.location.length > 1000) {
        errors.location = "Location must be between 3 and 1000 characters long!";
    }

    if (!sidewayData.category || sidewayData.category.length < 3 || sidewayData.category.length > 50) {
        errors.category = "Category must be between 3 and 50 characters long!";
    }

    if (!sidewayData.description || sidewayData.description.length < 10) {
        errors.description = "Description must be at least 10 characters long!";
    }

    return errors;
};

const validateComment = (commentData) => {
    let errors = {};

    if (!commentData.comment || commentData.comment.length < 3 || commentData.comment.length > 500) {
        errors.comment = "Comment must be between 3 and 500 characters long!";
    }

    return errors;
};

const validateRegister = (registerData) => {
    let errors = {};

    if (!registerData.email) {
        errors.email = "Missing email";
    }

    if (!registerData.password || registerData.password.length < 3) {
        errors.password = "Password must be at least 3 characters!";
    }

    if (!registerData.confirmPassword || registerData.confirmPassword !== registerData.password) {
        errors.confirmPassword = "Confirm password does not match!";
    }

    return errors;
};


export const validationHelper = {
    validateSideway,
    validateComment,
    validateRegister,
};