Ext.define('DWork.model.teacherLessonModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: '_id', type: 'string'},
        {name: 'lessonName', type: 'string'},
        {name: 'hourInWeek', type: 'number'}
    ]
});