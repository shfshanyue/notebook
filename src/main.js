import Vue from 'vue';

var vm = new Vue({
    el: 'body',
    data: {
        task: null,
        catalog: null,
        activeTask: null,
        activeCatalogId: 1
    },
    created() {
        this.catalog = this.fetch('catalog') || {
            "length": 3,
            "catalogs": [{
                "id": 1,
                "name": "css"
            }, {
                "id": 2,
                "name": "python"
            }, {
                "id": 3,
                "name": "javascript"
            }]
        };
        this.task = this.fetch('task') || {
            "length": 5,
            "tasks": [{
                "id": 2,
                "pid": 2,
                "title": "gevent",
                "content": "sfsf",
                "createTime": "2016/02/21, 12:41:01",
                "updateTime": "2016/02/22, 12:41:01"
            }, {
                "id": 3,
                "pid": 2,
                "title": "yield and generator",
                "content": "sfsf",
                "createTime": "2016/02/21, 12:41:01",
                "updateTime": "2016/02/22, 12:41:01"
            }, {
                "id": 4,
                "pid": 3,
                "title": "yield and generator",
                "content": "sfsf",
                "createTime": "2016/02/21, 12:41:01",
                "updateTime": "2016/02/22, 12:41:01"
            }, {
                "id": 5,
                "pid": 3,
                "title": "ajax and fetch",
                "content": "sfsf",
                "createTime": "2016/02/21, 12:41:01",
                "updateTime": "2016/02/22, 12:41:01"
            }]
        };
        this.activeTask = this.fetch('activeTask');
        this.activeCatalogId = this.fetch('activeCatalogId');
    },
    methods: {
        save(name, value) {
            localStorage.setItem(name, JSON.stringify(value));
        },

        fetch(name) {
            return JSON.parse(localStorage.getItem(name));
        }
    },
    watch: {
        tasks: {
            handler (tasks) {
                this.save('task', tasks);
            },
            deep: true
        },

        catalogs: {
            handler (catalogs) {
                this.save('catalog', catalogs);
            },
            deep: true
        },

        activeCatalogId (value) {
            this.activeTask = this.task.tasks.filter(key => key.pid===value)[0] || {};
            this.save('activeCatalogId', value);
        }


    },
    computed: {

    }
});
