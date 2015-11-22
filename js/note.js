var storage = new Storage();


var vm = new Vue({
    el: 'body',
    data: {
        tasks: storage.fetchTask(),
        catalogs: storage.fetchCatalog(),
        taskOfCatalogId: 0,
        editTask: {},
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
            }
        },
        addTask: function() {
            this.editable = true;
            this.editTask = {};
            document.getElementsByClassName('note-text')[0].textContent = '';
            document.getElementsByClassName('edit-content')[0].textContent = '';
        },
        saveTask: function() {
            if (!this.editable) 
                return;
            var id = this.taskOfCatalogId;
            var title = document.getElementsByClassName('note-text')[0].textContent.trim();
            var content = document.getElementsByClassName('edit-content')[0].textContent.trim();
            if (!this.editTask.title && title) {
                this.tasks[id].push({
                    title: title,
                    content: content,
                    size: content.length,
                    createTime: new Date().toLocaleString('en-GB', {hour12:false}),
                    updateTime: new Date().toLocaleString('en-GB', {hour12:false})
                });
            } else {
                this.editTask.title = title;
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
                console.log('catalog save');
            },
            deep: true,
        },
        editable: {
            handler: function() {
                storage.saveTask(this.tasks);
                console.log('task save');
            },
            deep: true,
        },
        tasks: {
            handler: function(newtasks, oldtasks) {
                console.log(newtasks);
                console.log(oldtasks);
            },
            deep: true,
        }
    },
    filter: {
        'reverse': function(value) {
            return value.split('').reverse().join('');
        }
    }
});

Vue.config.debug = true;


