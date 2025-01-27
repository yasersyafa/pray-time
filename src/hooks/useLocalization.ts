const useLocalization = (city: string) : string => {
    if(city === 'Jakarta') {
        return 'ID';
    } else if(city === 'London') {
        return 'GB';
    }
    else {
        return 'ID';
    }
};

export default useLocalization;