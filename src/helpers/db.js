import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('trees.db');

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS trees(id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL, lng REAL NOT NULL);', 
                [], 
                () => {
                    resolve()
                },
                (_, err) => {
                    reject(err);
                }
                );
        });
    });

    return promise;
};

export const insertTree = (title, imageUri, address, lat, lng) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO trees (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?);', 
                [title, imageUri, address, lat, lng], 
                (_, result) => {
                    resolve(result)
                },
                (_, err) => {
                    reject(err);
                }
                );
        });
    });

    return promise;
};

export const fetchTrees = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM TREES', 
                [], 
                (_, result) => {
                    resolve(result)
                },
                (_, err) => {
                    reject(err);
                }
                );
        });
    });

    return promise;
};