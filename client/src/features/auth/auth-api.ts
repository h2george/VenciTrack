export const loginUser = async (credentials: any) => {
    const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
    });
    return res.json();
};

export const registerUser = async (userData: any) => {
    const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    return res.json();
};

export const logoutUser = async () => {
    return fetch("/api/auth/logout", { method: "POST" });
};
