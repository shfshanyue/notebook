function Storage() {
    this.storage = window.localStorage;
}

Storage.prototype = {

    fetchCatalog: function() {
        return JSON.parse(this.storage.getItem('catalog')) || {
            length: 0,
            catalogs: []
        };
    },

    saveCatalog: function(catalogs) {
        this.storage.setItem('catalog', JSON.stringify(catalogs));
    },

    fetchTask: function() {
        return JSON.parse(this.storage.getItem('task') || '{}');
    },

    saveTask: function(tasks) {
        this.storage.setItem('task', JSON.stringify(tasks));
    },

    // get: function(name) {
    //     return this.storage.
    // },

    // save: function(name, obj) {
    //     this.storage.setItem(name, JSON.stringify(obj));
    // }
}

