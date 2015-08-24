Ext.define('DWork.model.generRulesGridModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'lessonName', type: 'string'},
        {name: 'subType', type: 'string'},
        {name: 'teachName', type: 'string'},
        {name: 'hoursSemester', type: 'number'},
        {name: 'institute', type: 'string'},
        {name: 'flow', type: 'string'},
        {name: 'course', type: 'number'},
        {name: 'employDuration', type: 'number'},
        {name: 'semester', type: 'number'},
        {name: 'year', type: 'number'},
        {name: 'maxLessWeek', type: 'number'},
        {name: '_id', type: 'string'}
    ],
    idProperty : '_id'
});
