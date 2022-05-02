import axios from 'axios';
import fs from 'fs';

/**
 * Get JSON file content, if JSON file doesn't exist download it and write to disk
 * @param {string} url The URL from which to download the desired JSON file
 * @param {string} path The filepath where the desired JSON file should be
 * @returns The content of the desired JSON file as JSON
 */
export const getJSONFile = async (url: string, path: string) => {
    return fs.promises.readFile(path).then(
        (data) => JSON.parse(data.toString()),
        () => downloadJSONFile(url, path)
    );
};

/**
 * Download a JSON file from the provided url and save it to the provided path
 * @param {string} url The URL from which to download the JSON file
 * @param {string} path The filepath to write the downloaded JSON file to
 * @returns The content of the downloaded JSON file as JSON
 */
export const downloadJSONFile = async (url: string, path: string) => {
    const response = await axios.get(url);
    fs.writeFile(
        path,
        JSON.stringify(response.data),
        (err) => err && console.error(err)
    );
    return response.data;
};
