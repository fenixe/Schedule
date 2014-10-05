Ext.define('DWork.model.teacherModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: '_id', type: 'string'},
        {name: 'teachName', type: 'string'},
        {name: 'cathedra', type: 'string' },
        {name: 'institute', type: 'string' },
        {name: 'prefeRules', type: 'string' },
        {name: 'hourInWeek', type: 'number' },
        {name: 'teachLess'},
        {name: 'teachRules'}
    ]
});