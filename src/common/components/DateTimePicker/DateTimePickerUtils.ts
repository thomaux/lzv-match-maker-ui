export function buildHoursList(list: string[], hour: number): string[] {
    if (hour === 23) {
        return list;
    }
    if (!(list.length % 2)) {
        list.push(hour + ':00');
        return buildHoursList(list, hour);
    }
    list.push(hour + ':30');
    return buildHoursList(list, ++hour);
}

export function zeroPad(input: string): string {
    if(!input) {
        return '';
    }
    return input.length === 2 ? input : '0' + input;
}