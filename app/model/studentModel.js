Ext.define('DWork.model.studentModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: '_id', type: 'string'},
        {name: 'groupName', type: 'string'},
        {name: 'cathedra', type: 'string'},
        {name: 'flow', type: 'string'},
        {name: 'course', type: 'number'},
        {name: 'admisyear', type: 'number'},
        {name: 'hourInWeek', type: 'number'}
    ]
});