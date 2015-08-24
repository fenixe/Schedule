Ext.define('DWork.view.teacherGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.teachergrid',
    id: 'teacherGrid',
    title: 'Список учителей',
    store: 'teacherStore',
    columnLine: true,
    border: false,
    multiSelect: true,
    autoDestroy: true,
    autoScroll: true,
    forceFit: true,
    plugins: [
        {
            ptype: 'rowediting',
            clicksToEdit: 2,
            cancelBtnText: 'Отмена',
            saveBtnText: 'Сохранить',
            pluginId: 'rowEditingTeach',
            listeners: {
                edit: function (editor, context) {
                    var teachLessData = Ext.getStore('teacherLessonStore').data.items;
                    var teachRulesData = Ext.getStore('teacherRulesStore').data.items;

                    var teachLessOut = [];
                    var teachRulesOut = [];
                    teachLessData.forEach(function (el) {
                        teachLessOut.push(el.data);
                    });
                    teachRulesData.forEach(function (el) {
                        teachRulesOut.push(el.data);
                    });

                    context.record.data['teachLess'] = teachLessOut;
                    context.record.data['teachRules'] = teachRulesOut;
                    context.grid.getStore().sync();

                }
            }
        }
    ],
    listeners: {
        select: function (el, record) {
            var me = this;
            Ext.getStore('teacherLessonStore').load({
                    params: {'_id': record.data['_id']},
                    callback: function (rec, oper, success) {
                        if (success) {
                            Ext.getStore('teacherRulesStore').load({
                                    params: {'_id': record.data['_id']},
                                    callback: function (rec, oper, success) {
                                        record.data['teachRules'] = record.data['prefeRules'];
                                        success ? me.up('form').getForm().setValues(record.data) : console.log("Фигня какая-то с загрузкой")
                                    }
                                }
                            );
                        }
                    }
                }
            );

        }
    },
    columns: [
        {
            text: 'Преподователь',
            dataIndex: 'teachName',
            flex: .2,
            renderer: function (value) {
                return '<img src="images/user_suit.png"> ' + value;
            },
            editor: {
                xtype: 'textfield'
            }
        },
        {
            text: 'Перечень предметов',
            dataIndex: 'teachLess',
            flex: .8,
            renderer: function (value) {
                return '<div style="white-space:normal !important;">' + value + '</div>';
            },
            editor: {
                xtype: 'gridpickerupdateteach'
            }
        },
        {
            text: 'Кафедра',
            dataIndex: 'cathedra',
            flex : 0.3,
            editor: {
                xtype: 'textfield'
            }
        },
        {
            text: 'Институт',
            dataIndex: 'institute',
            width: 60,
            editor: {
                xtype: 'combobox',
                store: comboStore,
                valueField: 'text',
                typeAhead: true,
                minChars: 0,
                typeAheadDelay: 10,
                autoSelect: true
            }
        },
        {
            text: 'Кол-во часов в неделю',
            dataIndex: 'hourInWeek',
            width: 130,
            editor: {
                xtype: 'numberfield'
            }
        },
        {
            text: 'Предпостение',
            dataIndex: 'prefeRules',
            width: 175,
            minWidth: 175,
            maxWidth: 175,
            renderer: function (value) {
                return '<div style="white-space:normal !important;">' + value + '</div>';
            },
            editor: {
                xtype: 'gridpickerupdateteachrules'
            }
        },
        {
            xtype: 'actioncolumn',
            width: 25,
            icon: 'images/delete.png',
            handler: function (view, rowIndex, colIndex, item, e, record, rew) {
                view.getStore().remove(record);
                Ext.getStore('teacherStore').sync();
            }
        }
    ]
});