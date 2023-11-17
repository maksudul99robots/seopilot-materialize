export const getDateTime = (date: any) => {
    if (date != null) {
        let newDate = new Date(date);
        // console.log(newDate.getDate());

        let x = ('0' + (newDate.getMonth() + 1)).slice(-2) +
            // "-" + newDate.getDate() +
            "-" + ('0' + (newDate.getDate())).slice(-2) +
            "-" + newDate.getFullYear();
        return x;
    }
    return '';
}