function schedule_render(val) {
    if (!val) return val;
    var record = Ext.getStore('curGridStore').getById(val);
    var lessonName = record.get('lessonName');
    var subType = record.get('subType');
    var teachName = record.get('teachName');
    return '<div style="word-wrap: : normal   !important;"><strong>' + lessonName + '</strong></br>' + subType + '</br>' + teachName + '</div>'
}

Ext.define('DWork.view.scheduleRulesGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.schedulerulesgrid',
    store: 'scheduleRulesStore',
    id: 'scheduleRulesGrid',
    columnLine: true,
    border: false,
    multiSelect: true,
    autoDestroy: false,
    autoScroll: true,
    forceFit: true,
    plugins: [
        {
            ptype: 'cellediting',
            clicksToEdit: 2,
            cancelBtnText: 'Отмена',
            saveBtnText: 'Сохранить',
            listeners: {
                canceledit: function (editor, context) {
                    if (context.record.phantom) {
                        context.grid.getStore().remove(context.record);
                    }
                },
                edit: function (editor, context) {
                    context.grid.getStore().sync();
                }
            }
        }
    ],
    listeners: {
        afterrender: function (el) {
            var storeName = el.getStore().storeId;
            var form = Ext.ComponentQuery.query("generaterulesform")[0];
            load_schedule_rules('curGridStore', storeName, form);
        }
    },
    tbar : [
        {
            xtype: 'numberfield',
            fieldLabel: 'Кол-во пар в день',
            minValue: 1,
            padding:5,
            itemId: 'numLess',
            maxValue: 8,
            listeners: {
                afterrender: function (el) {
                    Ext.getStore('scheduleRulesStore').on('load', function (store, records) {
                        el.setValue(records.length);
                    });
                },
                change: function (el, newValue) {
                    var grid = el.up().up();
                    var size = grid.getStore().count();
                    var formValue = Ext.ComponentQuery.query("generaterulesform")[0].getForm().getValues();
                    if (newValue > size) {
                        var arr = [];
                        for (var i = size; i < newValue; i++) {
                            var r = Ext.create('DWork.model.scheduleRulesModel', {
                                institute: formValue['institute'],
                                flow: formValue['flow'],
                                semester: formValue['semester'],
                                year: formValue['year'],
                                course: formValue['course'],
                                numLesson: i + 1
                            });
                            arr.push(r);
                        }
                        grid.getStore().insert(i, arr);
                    } else if (newValue < size) {
                        for (var i = size; i >= newValue; i--) {
                            grid.getStore().removeAt(i);
                        }
                    }
                    grid.getStore().sync();
                }
            }
        },
        {
            xtype: 'checkbox',
            fieldLabel: 'Суббота рабочий день',
            labelWidth : 120,
            listeners: {
                change: function (el, newValue) {
                    var grid = el.up().up();
                    var model = grid.getStore().getProxy().getModel();
                    var fields = model.getFields();
                    if (newValue) {
                        var column = Ext.create('Ext.grid.column.Column',
                            {
                                defaults: {
                                    align: "center",
                                    width: 250,
                                    renderer: schedule_render,
                                    editor: {
                                        xtype: 'lessoncombo'
                                    }
                                },
                                text: 'Суббота',
                                columns: [
                                    {
                                        text: '1 неделя',
                                        dataIndex: 'week-1:saturday'
                                    },
                                    {
                                        text: '2 неделя',
                                        dataIndex: 'week-2:saturday'
                                    }
                                ]
                            });
                        fields.push(
                            new Ext.data.Field(
                                {name: 'week-1:saturday', type: 'string'}
                            ),
                            new Ext.data.Field(
                                {name: 'week-2:saturday', type: 'string'}
                            ));
                        model.setFields(fields);

                        grid.headerCt.insert(grid.columns.length, column);
                        grid.getView().refresh();
                    } else {
                        var fields_temp = [];
                        fields = grid.getStore().model.fields.items;
                        fields.forEach(function (rec, id, ert) {
                            if ((rec.name != 'week-1:saturday') && (rec.name != 'week-2:saturday')) {
                                fields_temp.push(rec);
                            }
                        });
                        model.setFields(fields);
                        grid.headerCt.remove(grid.columns.length - 5);
                        grid.getView().refresh();
                    }
                }
            }
        }
    ],


    columns: {
        defaults: {
            align: "center"
        },
        items: [
            {
                xtype: 'rownumberer',
                renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                 return '<div style="text-align: center !important;" >'+record.data.numLesson + "</div>";
                 }
            },
            {
                defaults: {
                    align: "center",
                    width: 250,
                    renderer: schedule_render,
                    editor: {
                        xtype: 'lessoncombo'
                    }
                },
                text: 'Понедельник',
                columns: [
                    {
                        text: '1 неделя',
                        dataIndex: 'week-1:monday'

                    },
                    {
                        text: '2 неделя',
                        dataIndex: 'week-2:monday'

                    }
                ]
            },
            {
                defaults: {
                    align: "center",
                    width: 250,
                    renderer: schedule_render,
                    editor: {
                        xtype: 'lessoncombo'
                    }
                },
                text: 'Вторник',
                columns: [
                    {
                        text: '1 неделя',
                        dataIndex: 'week-1:tuesday'
                    },
                    {
                        text: '2 неделя',
                        dataIndex: 'week-2:tuesday'
                    }
                ]
            },
            {
                defaults: {
                    align: "center",
                    width: 250,
                    renderer: schedule_render,
                    editor: {
                        xtype: 'lessoncombo'
                    }
                },
                text: 'Среда',
                columns: [
                    {
                        text: '1 неделя',
                        dataIndex: 'week-1:wednesday'
                    },
                    {
                        text: '2 неделя',
                        dataIndex: 'week-2:wednesday'
                    }
                ]
            },
            {
                defaults: {
                    align: "center",
                    width: 250,
                    renderer: schedule_render,
                    editor: {
                        xtype: 'lessoncombo'
                    }
                },
                text: 'Четверг',
                columns: [
                    {
                        text: '1 неделя',
                        dataIndex: 'week-1:thursday'
                    },
                    {
                        text: '2 неделя',
                        dataIndex: 'week-2:thursday'
                    }
                ]
            },
            {
                defaults: {
                    align: "center",
                    width: 250,
                    renderer: schedule_render,
                    editor: {
                        xtype: 'lessoncombo'
                    }
                },
                text: 'Пятница',
                columns: [
                    {
                        text: '1 неделя',
                        dataIndex: 'week-1:friday'
                    },
                    {
                        text: '2 неделя',
                        width: 250,
                        align: "center",
                        dataIndex: 'week-2:friday'
                    }
                ]
            }
        ]
    }
});