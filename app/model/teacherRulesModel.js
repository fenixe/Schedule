Ext.define('DWork.model.teacherRulesModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: '_id', type: 'string'},
        {name: 'monday', type: 'boolean' , defaultValue : true },
        {name: 'tuesday', type: 'boolean' , defaultValue : true},
        {name: 'wednesday', type: 'boolean' , defaultValue : true},
        {name: 'thursday', type: 'boolean' , defaultValue : true},
        {name: 'friday', type: 'boolean' , defaultValue : true},
        {name: 'saturday', type: 'boolean' , defaultValue : true},
        {name: 'numLesson', type: 'number' }
    ]
});






