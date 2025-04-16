export const formatDate = (dateStr: string): string => {
    const date = new Date(dateStringToISO(dateStr));

    const month = date.toLocaleString('en-En', { month: 'long' });
    const day = date.getDate();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${month} ${day}, ${hours}:${minutes}`;
}

const dateStringToISO = (dateStr: string): string => {
    return dateStr.replace(" ", "T").replace(/\./g, '-');
};

export const compare = (a: number, b: number) => {
    if (a < b) {
        return 1;
    }

    if (a > b) {
        return -1;
    }

    return 0;
}