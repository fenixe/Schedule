Ext.define('DWork.view.navPanel', {
    extend: 'Ext.panel.Panel',
    id: 'navPanel',
    alias: 'widget.navpanel',
    title: 'Панель навигации',
    width: 160,
    minWidth: 160,
    maxWidth: 160,
    height: '100%',
    layout: 'vbox',
    collapsible: true,
    startCollapsed: false,
    frame: true,
    defaults: {
        xtype: 'button',
        height: 50,
        width: 140,
        margin: '20 auto 0 5',
        listeners: {
            click: function (btn) {
                btn.up().items.items.forEach(function (elm) {
                    elm.removeCls('buttonSelect');
                });
                btn.addCls('buttonSelect');
            }
        }
    },
    items: [
        {
            text: 'Расписание',
            margin: '60 20 0 5',
            handler: function (btn) {
                Ext.getCmp('mainPanel').removeAll();
                Ext.getCmp('mainPanel').setTitle('Учебное расписание');
                Ext.getCmp('mainPanel').add(
                   // Ext.create('DWork.view.scheduleRulesForm')
                );
            }

        },
        {
            text: 'Учебный план',
            handler: function (btn) {
                Ext.getCmp('mainPanel').removeAll();
                Ext.getCmp('mainPanel').setTitle('Управления учебным планом');
                Ext.getCmp('mainPanel').add(
                    Ext.create('DWork.view.curriculumForm')
                );
            }
        },
        {
            text: 'Преподователи',
            handler: function (btn) {
                Ext.getCmp('mainPanel').removeAll();
                Ext.getCmp('mainPanel').setTitle('Преподовательский состав');
                Ext.getStore('teacherStore').load();
                Ext.getStore('lessonsStore').load();
                Ext.getStore('teacherLessonStore').removeAll();
                Ext.getCmp('mainPanel').add(
                    Ext.create('DWork.view.teacherForm')
                );
            }

        },
        {
            text: 'Предметы',
            handler: function (btn) {
                Ext.getCmp('mainPanel').removeAll();
                Ext.getCmp('mainPanel').setTitle('Список предметов и аудиторий');
                Ext.getStore('lessonsStore').load();
                Ext.getCmp('mainPanel').add(
                    Ext.create('DWork.view.lessonsGrid')
                );
            }
        },
        {
            text: 'Студентческие группы',
            handler: function (btn) {
                Ext.getCmp('mainPanel').removeAll();
                Ext.getCmp('mainPanel').setTitle('Список студенческих груп');
                Ext.getCmp('mainPanel').add(
                    Ext.create('DWork.view.studentForm')
                );
            }
        }
    ]
});
