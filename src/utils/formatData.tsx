export const formatAccordionData = (td: any, view: any = false) => {
    const filteredArr = td?.reduce((acc: any, current: any) => {
        const x = acc?.find((item: any) => item.CustomerKey === current.CustomerKey);
        if (!x) {
            const newCurr = {
                title: current.CustomerName,
                CustomerKey: current.CustomerKey,
                plantData: [
                    {
                        key: current.PlantKey,
                        title: current.PlantName,
                        name: current.PlantName,
                        isSelected: view || current.isSelected || false
                    }
                ],
                isSelected: view || current.isSelected || false
            };
            return acc.concat([newCurr]);
        } else {
            const currData = x.plantData.filter((d: any) => d.key === current.key);
            if (!currData.length) {
                const newData = x.plantData.push({
                    key: current.PlantKey,
                    title: current.PlantName,
                    name: current.PlantName,
                    isSelected: view || current.isSelected || false
                });
                const newCurr = {
                    title: current.CustomerName,
                    CustomerKey: current.CustomerKey,
                    planData: newData,
                    isSelected: view || current.isSelected || false
                };
                return acc;
            } else {
                return acc;
            }
        }
    }, []);
    return filteredArr;
};

export const formatPlants = (td: any) => {
    let count = 0;
    const plantData = td?.map((item: any) => {
        item.isSelected && count++;
        return {
            key: item.PlantKey,
            title: item.PlantName,
            name: item.PlantName,
            isSelected: item.isSelected || false
        };
    });
    const filteredArr = [
        {
            title: 'All',
            CustomerKey: 1,
            plantData: plantData,
            isSelected: count === td?.length
        }
    ];
    return filteredArr;
};

export const extractCustKeyPlantKeys = (td: any) => {
    const filteredArr = td.reduce((acc: any, current: any) => {
        const x = acc?.find((item: any) => item.CustomerKey === current.CustomerKey);
        if (extractPlantKeysOnly([current])?.length) {
            const newCurr = {
                CustomerKey: current.CustomerKey,
                PlantKeys: extractPlantKeysOnly([current])
            };
            return acc.concat([newCurr]);
        } else {
            const currData = x?.plantData.filter((d: any) => d.isSelected);
            if (!currData?.length) {
                const newData = x?.plantData.push(current.PlantKey);
                const newCurr = {
                    CustomerKey: current.CustomerKey,
                    PlantKeys: newData
                };
                return acc;
            } else {
                return acc;
            }
        }
    }, []);
    return filteredArr;
};

export const extractPlantKeysOnly = (td: any) => {
    const __td = td?.[0];
    const plantData = __td?.plantData?.filter((item: any) => item.isSelected).map((item: any) => item.key);
    return plantData;
};

//extract ModuleName as key and mapp respective modules record to its respective key as set of array
export function badgeTableDataFormater(data: any) {
    const keyArr: any = new Set<string>(data?.map((item: any) => item?.ModuleName));
    const key: any = [...keyArr];
    const obj: any = {};
    const __data = key.forEach((k: any) => {
        const arr: any = [];
        data.forEach((item: any) => {
            if (item.ModuleName == k) {
                arr.push({ ...item });
            }
        });
        obj[k] = arr;
    });
    return obj;
}

const getInitIalData = (data: any) => {
    if (data.length) {
        data?.map((item: any) => {
            return {
                ModuleName: item?.ModuleName,
                FeatureKeys: []
            };
        });
    }
    return [];
};

// export function generateFormatedData(data: any) {
//     if (data?.length) {
//         const keyArr: any = new Set<string>(data?.map((item: any) => item?.ModuleName));
//         const key: any = [...keyArr];
//         const result: any = [];
//         key.forEach((k: any) => {
//             const obj: any = {};
//             const arr: any = [];
//             data.forEach((item: any) => {
//                 if (item.ModuleName == k) {
//                     arr.push(item.FeatureKey);
//                 }
//             });
//             obj['ModuleName'] = k;
//             obj['FeatureKeys'] = arr;
//             result.push(obj);
//         });
//         return result;
//     }
//     return getInitIalData(data);
// }

export function generateFormatedData(data: any) {
    if (data?.length) {
        const keyArr: any = new Set<string>(data?.map((item: any) => item?.ModuleName));
        const key: any = [...keyArr];
        const result: any = [];
        key.forEach((k: any) => {
            const obj: any = {};
            const arr: any = [];
            const idArr: any = [];
            data.forEach((item: any) => {
                if (item.ModuleName == k) {
                    arr.push(item.FeatureKey);
                    idArr.push(item.id);
                }
            });
            obj['ModuleName'] = k;
            obj['FeatureKeys'] = arr;
            obj['id'] = idArr;
            result.push(obj);
        });
        return result;
    }
    return getInitIalData(data);
}

export function generateFormatedData2(data: any) {
    console.log(data, 'inside method');
    if (data?.length) {
        const keyArr: any = new Set<string>(data?.map((item: any) => item?.ModuleName));
        const key: any = [...keyArr];
        const result: any = [];
        console.log(key, 'key');
        key.forEach((k: any) => {
            const obj: any = {};
            const arr: any = [];
            data.forEach((item: any) => {
                if (item.ModuleName == k) {
                    arr.push(...item.FeatureKeys);
                }
            });
            obj['ModuleName'] = k;
            obj['FeatureKeys'] = arr;

            result.push(obj);
        });
        return result;
    }
    return getInitIalData(data);
}

export const generateInitialBadgetableFormatedData = (arr: any) => {
    return {
        menuArr: arr?.filter((menu: any) => menu.FeatureType === 'Menu'),
        moduleArr: arr?.filter((menu: any) => menu.FeatureType === 'Module'),
        reportArr: arr?.filter((menu: any) => menu.FeatureType === 'Report'),
        dashboardArr: arr?.filter((menu: any) => menu.FeatureType === 'Dashboard')
    };
};

//Alarm
export const formatAlarmData = (data: any) => {
    return data?.map((item: any) => {
        return {
            title: item?.ParamName,
            line: item?.MachineName,
            status: item?.Severity,
            location: item?.PlantName,
            time: item?.LastTriggeredTime,
            severity: item?.SeverityKey,
            mmParamKey: item?.MMParamKey,
            timeperiodKey: item?.timeperiodKey,
            MachineKey: item?.MachineKey
        };
    });
};

export const formatAlarmDataObj = (data: any) => {
    if (data) {
        return {
            title: data?.ParamName,
            MachineKey: data?.MachineKey,
            line: data?.MachineName || data?.MachineModelName,
            status: data?.Severity,
            location: data?.PlantName,
            time: data?.LastTriggeredTime,
            severity: data?.SeverityKey,
            mmParamKey: data?.MMParamKey,
            timeperiodKey: data?.TimePeriodKey,
            NoOfOccurred: data?.NoOfOccurred,
            LastDuration: data?.LastDuration,
            machineModelKey: data?.MachineModelKey
        };
    }
    return {};
};
