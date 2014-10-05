Ext.define('DWork.model.lessonsModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: '_id', type: 'string'},
        {name: 'lessonName', type: 'string'},
        {name: 'auditForLesson', type: 'string'}
    ]
});