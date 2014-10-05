Ext.define('DWork.store.teacherLessonStore', {
    extend: 'Ext.data.Store',
    id: 'teacherLessonStore',
    model: 'DWork.model.teacherLessonModel',
    autoLoad: true,
    autoSync: false,
    sorters : {
        property : 'lessonName'
    },
    proxy: {
        api: {
            read: './app/data/ds/crud_teach_les.php'
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