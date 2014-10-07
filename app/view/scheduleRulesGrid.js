function schedule_render(val) {
 /*   if (!val) return val;
    var record = Ext.getStore('curGridStore').getById(val);
    var lessonName = record.get('lessonName');
    var subType = record.get('subType');
    var teachName = record.get('teachName');
    return '<div style="word-wrap: : normal   !important;"><strong>' + lessonName + '</strong></br>' + subType + '</br>' + teachName + '</div>'*/
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
        beforerender: function (el) {
            var storeName = el.getStore().storeId;
            load_schedule_rules('curGridStore', storeName, el.up('form'));
        }
    },
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