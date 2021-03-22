export const currentLogo = (categoryId) => {
    switch (categoryId) {
        case 1:
            return 'Apple';
        case 2:
            return 'Acer';
        case 3:
            return 'Asus';
        case 4:
            return 'MSI';
        case 5:
            return 'Lenovo';
        case 6:
            return 'Dell';
        case 7:
            return 'Huawai';
        case 8:
            return 'HP';
        case 9:
            return 'Honor';
        default:
            return 'none'
    }
}   