export const getDateTime = (date) => {
    if (date != null) {
        const dateTime = new Date(date);

        // Extracting the components
        const year = dateTime.getFullYear();
        const month = ('0' + (dateTime.getMonth() + 1)).slice(-2); // Adding leading zero
        const day = ('0' + dateTime.getDate()).slice(-2); // Adding leading zero

        // Formatting time
        const hours = ('0' + dateTime.getHours()).slice(-2); // 24-hour format
        const minutes = ('0' + dateTime.getMinutes()).slice(-2);

        // Constructing the final formatted string
        const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;
        return formattedDateTime;
    }
    return '';
}