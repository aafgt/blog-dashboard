export const getAuthToken = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        return null;
    }

    return token;
}

export const getAuthUserId = () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
        return null;
    }

    return userId;
}