export const dateTimeFormat = (dateTime) => {
    if(dateTime !== null) {
        const input = new Date(dateTime);
        return input.toLocaleDateString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    }
    return null;
}