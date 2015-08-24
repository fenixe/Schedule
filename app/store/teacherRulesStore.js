Ext.define('DWork.store.teacherRulesStore', {
    extend: 'Ext.data.Store',
    id: 'teacherRulesStore',
    model: 'DWork.model.teacherRulesModel',
    autoLoad: true,
    autoSync: false,
    sorters : {
        property : 'numLesson'
    },
    queryMode: 'local',
    proxy: {
        api: {
            read: './app/data/ds/crud_teach_rules.php'
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