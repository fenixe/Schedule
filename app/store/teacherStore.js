Ext.define('DWork.store.teacherStore', {
    extend: 'Ext.data.Store',
    id: 'teacherStore',
    model: 'DWork.model.teacherModel',
    autoLoad: true,
    autoSync: false,
    sorters : {
        property : 'teachName'
    },
    proxy: {
        api: {
            read: './app/data/ds/crud_teachers.php?crud=read',
            update: './app/data/ds/crud_teachers.php?crud=update',
            destroy: './app/data/ds/crud_teachers.php?crud=destroy',
            create: './app/data/ds/crud_teachers.php?crud=create'
        },
        type: 'ajax',
        simpleSortMode: true,
        filterParam: 'query',
        actionMethods: {
            create: 'POST',
            read: 'GET',
            update: 'POST',
            destroy: 'POST'
        },
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'totalCount',
            successProperty: 'success',
            messageProperty: 'message'
        },
        writer: {
            type: 'json'
        }
    }
});