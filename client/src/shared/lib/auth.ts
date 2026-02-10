export const checkAuth = async () => {
    try {
        const res = await fetch("/api/auth/me");
        return await res.json();
    } catch (err) {
        return { success: false };
    }
};

export const logout = async () => {
    try {
        await fetch("/api/auth/logout", { method: "POST" });
    } catch (err) {
        console.error("Logout failed");
    }
    window.location.href = "/login";
};
