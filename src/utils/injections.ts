import fs from 'fs';

type InjectionType = {eprintid: number, official_url: string}
let injections: Array<InjectionType> = [];
let injectionsLoaded: boolean = false;

const loadInjections = async () => {
    return fs.promises.readFile('injections.json').then(data => JSON.parse(data.toString())).then(data => {injections = data; return data});
}

export const getInjections = async () => {
    if (injectionsLoaded)
        return injections
    else {
        const data = await loadInjections();
        injectionsLoaded = true;
        return data as Array<InjectionType>; 
    } 
}


export const addInjection = async (injection: InjectionType) => {
    let data = await getInjections();
    
    const i = data.findIndex(elem => elem.eprintid === injection.eprintid);
    
    if(i != -1) 
        data[i] = injection;
    else 
        data = [...data, injection]

    injections = data;
    fs.promises.writeFile('injections.json', JSON.stringify(data));
}

export const removeInjection = async (eprintId: number) => {
    let data = await getInjections();
    const i = data.findIndex(elem => elem.eprintid === eprintId);

    if(i === -1)
        return
    else
        data.splice(i, 1);

    injections = data;
    fs.promises.writeFile('injections.json', JSON.stringify(data));
}

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


