Ext.define('DWork.store.scheduleRulesStore', {
    extend: 'Ext.data.Store',
    id: 'scheduleRulesStore',
    model: 'DWork.model.scheduleRulesModel',
    autoLoad: false,
    autoSync: false,
    sorters : {
        property : 'numLesson'
    },
    sortOnFilter : true,
    proxy: {
        api: {
            read: './app/data/ds/crud_schedules_rules.php?crud=read',
            create: './app/data/ds/crud_schedules_rules.php?crud=create',
            update: './app/data/ds/crud_schedules_rules.php?crud=update',
            destroy: './app/data/ds/crud_schedules_rules.php?crud=destroy'
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