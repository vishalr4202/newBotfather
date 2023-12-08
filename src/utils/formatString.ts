export function getFormattedData(data: any) {
    return data[0]?.toUpperCase() + data?.substring(1).toLowerCase();
}
