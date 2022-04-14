const API_DOMAIN = process.env.REACT_APP_API_DOMAIN || '';

export const postToApi = async (body: object) => {
    try {
        const result = await fetch(API_DOMAIN, {
            method: "POST",
            body: JSON.stringify(body),
        })
            .then((res) => {
                if (!res.ok) throw new Error(res.statusText);
                return res;
            });
        return result;
    } catch (error) {
        throw error;
    }
}
