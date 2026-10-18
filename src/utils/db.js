const fs = require('fs');
const path = require('path');
const stores = new Map();

/**
 * Buat (atau load) database JSON untuk nama koleksi yang diberikan.
 * @param {string} collectionName - contoh: "courses", "kitab", ...
 * @returns {Object} with methods: getData, push, write
 */
function getDB(collectionName) {
  const filePath = path.resolve(__dirname, '../data', `${collectionName}.json`);
  
  // Pastikan file ada dan berisi array
  if (!stores.has(collectionName)) {
    let data = { data: [] };
    if (fs.existsSync(filePath)) {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        data = JSON.parse(content);
        if (!data || !Array.isArray(data.data)) data = { data: [] };
      } catch (err) {
        console.error(`Error reading ${filePath}:`, err);
        data = { data: [] };
      }
    }
    stores.set(collectionName, data);
  }
  const data = stores.get(collectionName);
  
  return {
    /**
     * Ambil semua data
     * @returns {Array}
     */
    getData: () => {
      return data.data;
    },

    findByEmail: (email) => {
      const normalizedEmail = String(email).trim().toLowerCase();
      return data.data.find(item => String(item.email || '').toLowerCase() === normalizedEmail) || null;
    },
    
    /**
     * Tambah item ke data
     * @param {Object} item
     * @returns {Object} item yang ditambahkan
     */
    push: (item) => {
      data.data.push(item);
      return item;
    },
    
    /**
     * Tuliskan data ke file
     */
    write: () => {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    },
    
    /**
     * Cari item berdasarkan id
     * @param {string} id
     * @returns {Object|null} item yang ditemukan atau null
     */
    find: (id) => {
      return data.data.find(item => item.id === id) || null;
    },
    
    /**
     * Hapus item berdasarkan id
     * @param {string} id
     * @returns {Array} item yang dihapus
     */
    remove: (id) => {
      const removed = data.data.filter(item => item.id === id);
      data.data = data.data.filter(item => item.id !== id);
      return removed;
    },

    update: (id, changes) => {
      const item = data.data.find(entry => entry.id === id);
      if (!item) return null;
      Object.assign(item, changes);
      return item;
    }
  };
}

module.exports = { getDB };
