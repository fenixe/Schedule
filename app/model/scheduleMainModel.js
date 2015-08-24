Ext.define('DWork.model.scheduleRulesModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: '_id', type: 'string'},

        {name: 'institute', type: 'string'},
        {name: 'flow', type: 'string'},
        {name: 'course', type: 'number'},
        {name: 'semester', type: 'number'},
        {name: 'year', type: 'number'},
        {name: 'schedules_temp', type: 'string'},
        {name: 'schedules', type: 'string'},
        {name: 'rules', type: 'string'},



        {name: 'numLesson', type: 'number'},
        {name: 'week-1:monday', type: 'string'},
        {name: 'week-2:monday', type: 'string'},
        {name: 'week-1:tuesday', type: 'string'},
        {name: 'week-2:tuesday', type: 'string'},
        {name: 'week-1:wednesday', type: 'string'},
        {name: 'week-2:wednesday', type: 'string'},
        {name: 'week-1:thursday', type: 'string'},
        {name: 'week-2:thursday', type: 'string'},
        {name: 'week-1:friday', type: 'string'},
        {name: 'week-2:friday', type: 'string'}
       /* {name: 'week-1:saturday', type: 'string'},
        {name: 'week-2:saturday', type: 'string'}*/
    ]/*,
    idProperty : '_id'*/
});
