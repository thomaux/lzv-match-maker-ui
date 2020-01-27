const apiRoot = "https://localhost:8443";

export async function isLoggedIn(): Promise<boolean> {
    const response = await fetch(apiRoot + "/auth/check", { credentials: "include" });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return (await response.json()).session;
}

export async function logout(): Promise<void> {
    const response = await fetch(apiRoot + "/auth", { method: "DELETE", credentials: "include" });

    if (!response.ok) {
        throw new Error(response.statusText);
    }
}