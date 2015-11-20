function Storage() {
    this.storage = window.localStorage;
}

Storage.prototype = {

    // Catalog getters/setters
    createCatalog: function(name) {
        var catalogs = this.getCatalog();
        if (catalogs && name) {
            catalogs[catalogs.length] = {
                id: catalogs.length,
                name: name,
                length: 0,
            };
            catalogs.length += 1;
        } else if (!catalogs) {
            catalogs = {};
            catalogs[0] = {
                id: 0,
                name: name,
                length: 0,
            };
            catalogs.length = 1;
        }
        this.storage.setItem('catalog', JSON.stringify(catalogs));
    },

    getCatalog: function() {
        var catalogs = this.storage.getItem('catalog');
        return catalogs ? JSON.parse(catalogs): null;
    },

    removeCatalog: function(id) {
        var catalogs = this.getCatalog();
        if (catalogs[id]) {
            delete catalogs[id];
            return true;
        }
        return false;
    },

    createTask: function(pid, title, content) {
        var tasks = this.getTask();
        var task = {
            title: title,
            content: content,
            size: content.length,
            createTime: new Date(),
            updateTime: new Date(),
        };
        if (tasks) {
            if (!tasks[pid]) {
                tasks[pid] = {};
                tasks[pid].length = 0;
            }
            task.id = tasks.length;
            tasks[pid][tasks.length] = task;
            tasks.length += 1;
            tasks[pid].length += 1;
        } else{
            tasks = {};
            tasks.length = 1;
            tasks[pid] = {};
            task.id = 0;
            tasks[pid][0] = task;
            tasks[pid].length = 1;
        }
        this.storage.setItem('task', JSON.stringify(tasks));
    },

    editTask: function(pid, id, title, content) {
        var tasks = this.getTask();
        if (tasks && tasks[pid] && tasks[pid][id]) {
            tasks[pid][id].title = title;
            tasks[pid][id].content = content;
            tasks[pid][id].size = content.length;
            tasks[pid][id].updateTime = new Date();
            this.storage.setItem('task', JSON.stringify(tasks));
        }
    },

    getTask: function() {
        var tasks = this.storage.getItem('task');
        return tasks ? JSON.parse(tasks): {};
    },

    removeTask: function(pid, id) {
        var tasks = this.getTask();
        if (tasks[pid] && tasks[pid][id]) {
            delete tasks[pid][id];
            this.storage.setItem('task', JSON.stringify(tasks));
            return true;
        }
        return false;
    },

    getTaskOfCatalog: function(pid) {
        var tasks = this.getTask();
        return tasks ? tasks[pid]: null;
    }

}

