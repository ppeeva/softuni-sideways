export const formatDate = (input) => {
    // March 31, 2023
    const date = new Date(input);

    return date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};