import fs from 'fs';
import path from 'path';

const writeJSONFile = (filename, user) => {
    fs.writeFileSync(path.join(__dirname, filename), JSON.stringify(user), 'utf8', (err) => {
        if (err) {
            console.log(err)
        }
    })
}

export const deleteAndCreateFile = (filename) => {
    var filePath = path.join(__dirname, filename);
    return new Promise( (resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify([]), (err) => {
            if (err) reject(err);
            resolve();
        });
    })
}

export default writeJSONFile