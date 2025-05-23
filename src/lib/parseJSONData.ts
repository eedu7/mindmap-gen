export const parseJSONData = (text: string) => {
    return JSON.parse(text.trim().slice(8).slice(0, -3));
};
