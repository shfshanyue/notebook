var storage = new Storage();

var vm = new Vue({
    el: 'body',
    data: {
        tasks: storage.getTask(),
        showTasks: storage.getTaskOfCatalog(0),
        catalogs: storage.getCatalog(),
        newCatalog: '',
        taskOfCatalogId: 0,
        model: false,
    },
    methods: {
        toggleModel: function(event) {
            this.model = !this.model;
        },

        addCatalog: function() {
            if (this.newCatalog) {
                storage.createCatalog(this.newCatalog);
                this.catalogs = storage.getCatalog();
                this.newCatalog = '';
                this.model = false;
            }
        },

        addTask: function() {
            var id = this.taskOfCatalogId;
            storage.createTask(id, 'python', '装饰器的功能');
            this.showTasks = storage.getTaskOfCatalog(id);
        },
    },
    watch: {
        taskOfCatalogId: {
            handler: function(id) {
                this.showTasks = storage.getTaskOfCatalog(id);
            },
        },
        showTasks: {
            
        }
    },
})

