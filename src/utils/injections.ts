import fs from 'fs';

type InjectionType = { eprintid: number, official_url: string }
let injections: Array<InjectionType> = [];
let injectionsLoaded: boolean = false;

/** 
 * Get all injections from the injections.json file and load them into the injections array
 * @returns The loaded injections as an array of InjectionType
*/
const loadInjections = async () => {
    let data = await fs.promises.readFile('injections.json');
    injections = JSON.parse(data.toString());
    return injections;
}

/**
 * Get all injections, if they haven't been loaded yet, load them
 * @returns All injections as an array of InjectionType
 */
export const getInjections = async () => {
    if (injectionsLoaded)
        return injections;
    else {
        const data = await loadInjections();
        injectionsLoaded = true;
        return data as Array<InjectionType>; 
    } 
}

/**
 * Add an injection to the injections.json file and the injections array
 */
export const addInjection = async (injection: InjectionType) => {
    let data = await getInjections();
    
    const i = data.findIndex(elem => elem.eprintid === injection.eprintid);
    
    if(i != -1) 
        data[i] = injection;
    else 
        data = [...data, injection];

    injections = data;
    fs.promises.writeFile('injections.json', JSON.stringify(data));
}

/**
 * Remove an injection from the injections.json file and the injections array
 * @param eprintId The eprintId of the injection to remove
 */
export const removeInjection = async (eprintId: number) => {
    let data = await getInjections();
    const i = data.findIndex(elem => elem.eprintid === eprintId);

    if(i === -1)
        return;
    else
        data.splice(i, 1);

    injections = data;
    fs.promises.writeFile('injections.json', JSON.stringify(data));
}

/**
 * Directly inject all injections into the given data array
 * @param data An array of data to inject into
 * @returns The given data array with the injected data
 */
export const injectData = async (data: any[]) => {
    const inj = await getInjections();
    const injectedData = data.map(dataElem => {
        const index = inj.findIndex(injElem => injElem.eprintid === dataElem.eprintid);
        if(index != -1) {
            dataElem.official_url = inj[index].official_url;
        }
        return dataElem;
    });

    return injectedData;
}
