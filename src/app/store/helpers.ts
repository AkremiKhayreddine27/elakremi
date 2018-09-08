export interface Pagination {
    page: number;
    perPage: number;
}

export interface Filter {
    field: string;
    search: any;
    filter?: (cell: any, search: any) => any;
}

export interface FilterConf {
    filters: Filter[];
    andOperator: boolean;
}

export interface SortConf {
    field: string;
    direction: string;
    compare?: (direction: any, a: any, b: any) => any;
}

export class LocalFilter {

    protected static FILTER = (value: string, search: string) => {
        return value.toString().toLowerCase().includes(search.toString().toLowerCase());
    }

    static filter(data: Array<any>, field: string, search: any, customFilter?: Function): Array<any> {
        const filter: Function = customFilter ? customFilter : this.FILTER;

        return data.filter((el) => {
            const value = typeof getDataFromObject(el, field) === 'undefined' || getDataFromObject(el, field) === null ? '' : getDataFromObject(el, field);
            return filter.call(null, value, search);
        });
    }
}

export class LocalSorter {

    protected static COMPARE = (direction: any, a: any, b: any) => {

        let first = typeof a === 'string' ? a.toLowerCase() : a;
        let second = typeof b === 'string' ? b.toLowerCase() : b;

        if (first < second) {
            return -1 * direction;
        }
        if (first > second) {
            return direction;
        }
        return 0;
    }

    static sort(data: Array<any>, field: string, direction: string, customCompare?: Function): Array<any> {

        const dir: number = (direction === 'asc') ? 1 : -1;
        const compare: Function = customCompare ? customCompare : this.COMPARE;

        return data.sort((a, b) => {
            return compare.call(null, dir, getDataFromObject(a, field), getDataFromObject(b, field));
        });
    }
}

export class LocalPager {
    static paginate(data: Array<any>, page: number, perPage: number): Array<any> {
        return data.slice(perPage * (page - 1), perPage * page);
    }
}

export function filter(filterConf: FilterConf, data: Array<any>): Array<any> {
    let filtred: Array<any> = [...data];
    if (filterConf.filters) {
        if (filterConf.andOperator) {
            filterConf.filters.forEach((fieldConf: any) => {
                if (fieldConf['search'].length > 0) {
                    filtred = LocalFilter
                        .filter(filtred, fieldConf['field'], fieldConf['search'], fieldConf['filter']);
                }
            });
        } else {
            let mergedData: any = [];
            filterConf.filters.forEach((fieldConf: any) => {
                if (fieldConf['search'].length > 0) {
                    mergedData = mergedData.concat(LocalFilter
                        .filter(data, fieldConf['field'], fieldConf['search'], fieldConf['filter']));
                }
            });
            // remove non unique items
            filtred = mergedData.filter((elem: any, pos: any, arr: any) => {
                return arr.indexOf(elem) === pos;
            });
        }
    }
    return filtred;
}

export function sort(sortConf: SortConf[], data: Array<any>): Array<any> {
    let sorted: Array<any> = [...data];
    if (sortConf) {
        sortConf.forEach((fieldConf) => {
            sorted = LocalSorter
                .sort(sorted, fieldConf['field'], fieldConf['direction'], fieldConf['compare']);
        });
    }
    return sorted;
}

export function paginate(pagingConf: Pagination, data: Array<any>): Array<any> {
    let paginated: Array<any> = [...data];
    if (pagingConf && pagingConf['page'] && pagingConf['perPage']) {
        paginated = LocalPager.paginate(data, pagingConf['page'], pagingConf['perPage']);
    }
    return paginated;
}

export function convertToEntity(data: any[], entities: { [id: number]: any } = {}) {
    return data.reduce(
        (items: { [id: number]: any }, item: any) => {
            return {
                ...items,
                [item.id]: item
            };
        },
        { ...entities });
}

export function getDataFromObject(object, path) {
    let parts = path.split(".");
    if (parts.length == 1) {
        return object[parts[0]];
    }
    return getDataFromObject(object[parts[0]], parts.slice(1).join("."));
}