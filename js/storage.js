function Storage() {
    this.storage = window.localStorage;
}

Storage.prototype = {

    fetchCatalog: function() {
        return JSON.parse(this.storage.getItem('catalog') || '{"length":2,"catalogs":[{"id":0,"name":"python","length":0},{"id":1,"name":"javascript","length":0}]}')
    },

    saveCatalog: function(catalogs) {
        this.storage.setItem('catalog', JSON.stringify(catalogs));
    },

    fetchTask: function() {
        return JSON.parse(this.storage.getItem('task')) || {"0":[{"title":"python列表推导式与字典推导式","content":"[i for i in range(100)]<br>{k:v for k,v in enumerate('abced')}","size":62,"createTime":"13/12/2015, 10:00:31","updateTime":"13/12/2015, 10:13:48"},{"title":"切片命名","content":"str = 'wangxiansdfasfasfasdfas'<br>name = slice(8)<br>str[name]&nbsp;&nbsp;&nbsp; // wangxian","size":93,"createTime":"13/12/2015, 10:05:35","updateTime":"13/12/2015, 10:11:50"}],"1":[{"title":"ES6 promise的用法","content":"p.then(data =&gt;{<br>&nbsp;&nbsp;&nbsp; // dosomething<br>}).catch(err =&gt; {<br><br>});","size":90,"createTime":"13/12/2015, 10:16:29","updateTime":"13/12/2015, 10:16:29"}]};
    },

    saveTask: function(tasks) {
        this.storage.setItem('task', JSON.stringify(tasks));
    },

    getCid: function() {
        return JSON.parse(this.storage.getItem('taskOfCatalogId')) || 0;
    },

    saveCid: function(cid) {
        this.storage.setItem('taskOfCatalogId', JSON.stringify(cid));
    },

    getEditTask: function() {
        return JSON.parse(this.storage.getItem('editTask')) || this.fetchTask()[0][0] || {};
    },

    saveEditTask: function(task) {
        this.storage.setItem('editTask', JSON.stringify(task));
    }
}

