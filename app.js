Ext.require([
    'Ext.grid.*',
    'Ext.form.*'
]);

function load_curriculum(storeName, formName){
    var form = formName.getForm().getValues();
    Ext.getStore(storeName).load(
        {
            params: {
                institute: form['institute'],
                flow: form['flow'],
                semester: form['semester'],
                year: form['year'],
                course: form['course']
            }
        }
    );
}

function load_schedule_rules(storeMainName, storeName, formName) {

    var form = formName.getForm().getValues();


    Ext.getStore(storeMainName).load(
        {
            params: {
                institute: form['institute'],
                flow: form['flow'],
                semester: form['semester'],
                year: form['year'],
                course: form['course']
            },
            callback: function (records, operation, success) {
                if (success) {
                    load_curriculum(storeName, formName);
                }
            }
        }
    );
}

var typeStore = Ext.create('Ext.data.Store', {
    sorters: {
        property: 'text'
    },
    fields: [
        {name: 'id', type: 'string'},
        {name: 'text', type: 'string'}
    ],
    data: [
        {text: 'Лекция', id: 'lec'},
        {text: 'Практическое', id: 'prac'},
        {text: 'Лабораторная', id: 'lab'},
        {text: 'Семинар', id: 'sem'},
        {text: 'Факультатив', id: 'fac'}
    ]
});

var comboStore = Ext.create('Ext.data.Store', {
    sorters: {
        property: 'text'
    },
    fields: [
        {name: 'id', type: 'string'},
        {name: 'text', type: 'string'}
    ],
    data: [
        {text: 'ИПСА', id: 'IPSA'},
        {text: 'ФАИТ', id: 'FAIT'},
        {text: 'КВТ', id: 'CVT'}

    ]
});
var flowStore = Ext.create('Ext.data.Store', {
    sorters: {
        property: 'text'
    },
    fields: [
        {name: 'id', type: 'string'},
        {name: 'text', type: 'string'}
    ],
    data: [
        {text: 'Системы искусственного интилекта', id: 'IS'},
        {text: 'Ситемный анализ', id: 'SA'}
    ]
});

Ext.application({
    requires: ['Ext.container.Viewport'],
    name: 'DWork',
    appFolder: 'app',

    stores: [ 'curGridStore', 'teacherStore', 'lessonsStore', 'studentStore', 'teacherLessonStore', 'scheduleRulesStore', 'teacherRulesStore'],
    views: ['navPanel', 'mainPanel', 'scheduleMain', 'generateRulesForm', 'curriculumForm', 'curGrid', 'teacherForm', 'teacherGrid', 'studentGrid', 'studentForm',
        'teacherLessonGrid', 'gridPickerNewTeach', 'gridPickerUpdateTeach', 'lessonsGrid', 'scheduleRulesGrid','generateRulesGrid',
        'scheduleRulesForm', 'lessonCombo' , 'teacherRulesGrid', 'gridPickerNewTeachRules', 'gridPickerUpdateTeachRules'],

    launch: function () {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [
                {
                    title: 'Система формирования учебного расписания. Админастративная панель',
                    xtype: 'panel',
                    layout: 'border',
                    defaults: {
                        border: false,
                        split: true
                    },
                    items: [
                        {
                            region: 'west',
                            xtype: 'navpanel'
                        },
                        {
                            region: 'center',
                            xtype: 'mainpanel'

                        }
                    ]
                }
            ]

        });
    }


})
;