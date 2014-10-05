Ext.define('DWork.store.lessonsStore', {
    extend: 'Ext.data.Store',
    id: 'lessonsStore',
    model: 'DWork.model.lessonsModel',
    autoLoad: true,
    autoSync: false,
    sortOnFilter : true,
    sorters : {
        property : 'lessonName'
    },
    proxy: {
        api: {
            read: './app/data/ds/crud_lessons.php?crud=read',
            create: './app/data/ds/crud_lessons.php?crud=create',
            update: './app/data/ds/crud_lessons.php?crud=update',
            destroy: './app/data/ds/crud_lessons.php?crud=destroy'
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