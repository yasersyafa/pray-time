const useDate = () : string => {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() returns 0-indexed value
    const year = date.getFullYear().toString();

    return `${day}-${month}-${year}`;
};

export default useDate;