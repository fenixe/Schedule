Ext.define('DWork.store.generRulesGridStore', {
    extend: 'Ext.data.Store',
    id: 'generRulesGridStore',
    model: 'DWork.model.generRulesGridModel',
    autoLoad: false,
    autoSync: false,
    sorters : {
        property : 'lessonName'
    },
    proxy: {
        api: {
            read: './app/data/ds/crud_curgrid.php?crud=read',
            update: './app/data/ds/crud_curgrid.php?crud=update',
            create: './app/data/ds/crud_curgrid.php?crud=create',
            destroy: './app/data/ds/crud_curgrid.php?crud=destroy'
        },
        type: 'ajax',
        simpleSortMode: true,
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