const API_DOMAIN = process.env.REACT_APP_API_DOMAIN || '';

export const postToApi = async (body: string) => {
    try {
        const result = await fetch(API_DOMAIN + body, {
            method: "GET",
        }).then((res) => {
            if (!res.ok) throw new Error(res.statusText);
            return res;
        });
        return result;
    } catch (error) {
        throw error;
    }
}
