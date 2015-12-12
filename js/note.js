var storage = new Storage();
var vm = new Vue({
    el: 'body',
    data: {
        tasks: storage.fetchTask(),
        catalogs: storage.fetchCatalog(),
        taskOfCatalogId: storage.getCid(),
        editTask: storage.getEditTask(),
        editable: false,
        newCatalog: '',
        model: false,
    },
    methods: {
        toggleModel: function(event) {
            this.model = !this.model;
        },

        addCatalog: function() {
            var catalogname = this.newCatalog;
            if (catalogname) {
                if (!this.catalogs['length']) {
                    this.catalogs['length'] = 0;
                    this.catalogs.catalogs = [];
                } 
                var len = this.catalogs.length;
                var catalog = {
                    'id': len,
                    'name': catalogname,
                    'length': 0,
                }
                this.catalogs.length++;
                this.catalogs.catalogs.push(catalog);
                Vue.set(this.tasks, len, []);
                this.newCatalog = '';
                this.model = false;
                this.taskOfCatalogId = len;
            }
        },
        removeCatalog: function(catalog) {
            this.catalogs.catalogs.$remove(catalog);
        },
        removeTask: function() {
            this.tasks[this.taskOfCatalogId].$remove(this.editTask);
        },
        toggleTaskPanel: function() {
            this.editable = true;
            this.editTask = {};
            document.getElementsByClassName('note-text')[0].innerHTML = '';
            document.getElementsByClassName('edit-content')[0].innerHTML = '';
        },
        saveTask: function() {
            if (!this.editable) 
                return;
            var id = this.taskOfCatalogId;
            var title = document.getElementsByClassName('note-text')[0].textContent.trim();
            var content = document.getElementsByClassName('edit-content')[0].innerHTML.trim();
            if (!this.editTask.title && title) {
                var task = {
                    title: title,
                    content: content,
                    size: content.length,
                    createTime: new Date().toLocaleString('en-GB', {hour12:false}),
                    updateTime: new Date().toLocaleString('en-GB', {hour12:false})
                };
                this.tasks[id].push(task);
                this.editTask = task;

            } else {
                this.editTask.title = title ? title: 'untitled';
                this.editTask.content = content;
                this.editTask.size = content.length;
                this.editTask.updateTime = new Date().toLocaleString('en-GB', {hour12:false});
            }
            this.editable = false;
        },
    },
    watch: {
        catalogs: {
            handler: function(catalogs) {
                storage.saveCatalog(catalogs);
            },
            deep: true,
        },
        editable: {
            handler: function() {
                storage.saveTask(this.tasks);
            },
            deep: true,
        },
        tasks: {
            handler: function(tasks) {
                storage.saveTask(this.tasks);
            },
            deep: true,
        },
        taskOfCatalogId: {
            handler: function(cid) {
                storage.saveCid(cid);
                this.editTask = this.tasks[cid][0] || {};
            }
        },
        editTask: {
            handler: function(task) {
                storage.saveEditTask(task);
            }
        }
    },
    filter: {
        'reverse': function(value) {
            return value.split('').reverse().join('');
        }
    }
});




