async function connectToIndexDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("myDatabase", 1);

    request.onerror = () => {
      reject("Error opening IndexDB");
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore("myStore");
    };
  });
}

export async function getFilesFromIndexDB(params) {
  return new Promise(async (resolve, reject) => {
    // Connect to IndexDB
    const db = await connectToIndexDB();

    // Get all files from IndexDB
    const transaction = db.transaction("myStore", "readonly");
    const store = transaction.objectStore("myStore");
    const request = store.getAll();

    request.onsuccess = (event) => {
      const files = event.target.result;
      resolve(files);
    };

    request.onerror = () => {
      reject("Error getting files");
    };
  });
}

export async function storeFileInIndexDB(file, key) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("myDatabase", 1);

    request.onerror = () => {
      reject("Error opening IndexedDB");
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction("myStore", "readwrite");
      const store = transaction.objectStore("myStore");

      const request = store.put(file, key);

      request.onsuccess = () => {
        resolve("File stored successfully");
      };

      request.onerror = () => {
        reject("Error storing file");
      };
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore("myStore");
    };
  });
}
