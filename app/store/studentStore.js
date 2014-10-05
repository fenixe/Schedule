Ext.define('DWork.store.studentStore', {
    extend: 'Ext.data.Store',
    id: 'studentStore',
    model: 'DWork.model.studentModel',
    autoLoad: true,
    autoSync: true,
    sorters : {
        property : 'groupName'
    },
    proxy: {
        api: {
            read: './app/data/ds/crud_students.php?crud=read',
            update: './app/data/ds/crud_students.php?crud=update',
            destroy: './app/data/ds/crud_students.php?crud=destroy',
            create: './app/data/ds/crud_students.php?crud=create'
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