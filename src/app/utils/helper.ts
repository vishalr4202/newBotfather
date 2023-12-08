import { filter } from 'lodash';
function isValidDate(dateObject: any) {
    return new Date(dateObject).toString() !== 'Invalid Date';
}

export function descendingComparator(a: string, b: string, orderBy: number) {
    let aVal = a[orderBy];
    let bVal = b[orderBy];

    // let aDate = new Date(aVal);
    // let bDate = new Date(bVal);

    const validDateA = isValidDate(new Date(aVal));
    const validDateB = isValidDate(new Date(bVal));

    if (validDateA && validDateB) {
        if (validDateB < validDateA) {
            return -1;
        }
        if (validDateB > validDateA) {
            return 1;
        }
        return 0;
    }

    if (typeof a[orderBy] === 'string') {
        aVal = a[orderBy]?.toLowerCase();
        bVal = b[orderBy]?.toLowerCase();
    }
    if (bVal < aVal) {
        return -1;
    }
    if (bVal > aVal) {
        return 1;
    }
    return 0;
}

export function getComparator(order: string, orderBy: number) {
    return order === 'desc'
        ? (a: string, b: string) => descendingComparator(a, b, orderBy)
        : (a: string, b: string) => -descendingComparator(a, b, orderBy);
}

export function applySortFilter(array: any[], order: any, query: any, orderBy: any) {
    const comparator = getComparator(order, orderBy);
    const stabilizedThis = array?.map((el, index) => [el, index]);
    stabilizedThis?.sort((a, b) => {
        const orderVal = comparator(a[0], b[0]);
        if (orderVal !== 0) return orderVal;
        return a[1] - b[1];
    });
    if (query) {
        // return filter(
        //     array,
        //     (_user) => _user?.[orderBy]?.toLowerCase()?.indexOf(query?.toString()?.toLowerCase()) !== -1
        // );
        const news: any[] = [];
        const arrayArray = array?.filter((ele: any) => {
            return Object.values(ele)
                ?.map((elem: any) => {
                    return elem ? elem.toString().toLowerCase() : elem;
                })
                ?.filter((item: any) => {
                    if (item && item.toLowerCase().indexOf(query.toString().toLowerCase()) > -1 && !news.includes(ele)) {
                        news.push(ele);
                        return ele;
                    }
                });
        });
        return news;
    }
    return stabilizedThis?.map((el) => el[0]);
}
// For converting file to base64 string
export function convertBlobFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result as string);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
}
