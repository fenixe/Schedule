function lessSetRulesField(grid) {
    var picker = Ext.getCmp(grid.pickerCreatId);
    var records = grid.getStore().data.items;
    var lessWeek = Ext.getStore('teacherRulesStore').count();
    var count = 0;
    records.forEach(function (el) {
        Ext.each(el.data, function (rec, value, myself) {
            for (var p in el.data) {
                if ((typeof rec[p] == "boolean") && !rec[p]) {
                    count++;
                }
            }
        });
    });
    var text = 'Макс. кол-во пар в неделю: ' + lessWeek + ' Кол-во окон: ' + count;
    picker.setValue(text);
}

Ext.define('DWork.view.teacherRulesGrid', {
    extend: 'Ext.grid.Panel',
    store: 'teacherRulesStore',
    columnLine: true,
    multiSelect: true,
    autoDestroy: false,
    autoScroll: true,
    forceFit: true,
    viewConfig: {
        markDirty: false
    },
    floating: true,
    hidden: true,
    rowLines: false,
    minHeight: 200,
    maxHeight: 200,
    minWidth: 500,
    width: 500,
    style: {
        borderColor: '#FFDBA0',
        borderWidth: 3,
        borderStyle: 'solid'
    },

    /*plugins: [
     {
     ptype: 'cellediting',
     clicksToEdit: 2,
     listeners: {
     edit: function (editor, context, eOpts) {
     var grid = context.grid;
     var value = context.value;
     var editor = context.column.getEditor();
     var editXType = editor.getXType();
     if (editXType === 'combobox') {
     try {
     context.record.data['_id'] = editor.getStore().findRecord('lessonName', value).data['_id'];
     } catch (ex) {
     }
     lessSetTextField(grid);
     }
     }
     }
     }
     ],*/
    listeners: {
        cellclick: function (view, td, cellIndex, record, tr, rowIndex, e, eOpts) {
            var dayName = view.getGridColumns()[cellIndex].dataIndex;
            var rec = record.get(dayName);
            if (rec) {
                record.set(dayName, false);
            } else {
                record.set(dayName, true);
            }
            lessSetRulesField(view.up());
        }
    },
    tbar: [
        {
            xtype: 'textfield',
            fieldLabel: 'Макс. кол-во пар в день',
            minValue: 1,
           //value: 5,
            frame: true,
            width: 280,
            labelWidth: 130,
            labelAlign: 'left',
            maxValue: 8,
            listeners: {
                afterrender: function (el) {
                    Ext.getStore('teacherRulesStore').on('load', function (store, records) {
                        el.setValue(records.length);
                    });
                },
                change: function (el, newValue) {
                    var grid = el.up().up();
                    var size = grid.getStore().count();
                    if (newValue > size) {
                        var arr = [];
                        for (var i = size; i < newValue; i++) {
                            var r = Ext.create('DWork.model.teacherRulesModel', {
                                numLesson: i + 1
                            });
                            arr.push(r);
                        }
                        grid.getStore().removeAll();
                        grid.getStore().insert(0, arr);
                    } else if (newValue < size) {
                        for (var i = size; i >= newValue; i--) {
                            grid.getStore().removeAt(i);
                        }
                    }
                    //grid.getStore().sync();
                }
            }
        }/*,
         {
         xtype: 'button',
         text: 'Удалить запись',
         iconCls: 'icon-delete',
         handler: function (btn) {
         var grid = btn.up().up();
         var selection = grid.getView().getSelectionModel().getSelection();
         if (selection) {
         grid.getStore().remove(selection);
         }
         lessSetTextField(grid);
         }
         }*/
    ],
    columns: {
        defaults: {
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                if (value) {
                    metaData.tdCls += 'icon-accept';
                } else {
                    metaData.tdCls += 'icon-no-accept';
                }
            }
        },
        items: [
            {
                xtype: 'rownumberer',
                renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                    return '<div style="text-align: center !important; " >' + record.data.numLesson + "</div>";
                }
            },
            {
                text: 'Понедельник',
                dataIndex: 'monday',
                flex: 1
            },
            {
                text: 'Вторник',
                dataIndex: 'tuesday',
                flex: 1
            },
            {
                text: 'Среда',
                dataIndex: 'wednesday',
                flex: 1
            },
            {
                text: 'Четверг',
                dataIndex: 'thursday',
                flex: 1
            },
            {
                text: 'Пятница',
                dataIndex: 'friday',
                flex: 1
            },
            {
                text: 'Суббота',
                dataIndex: 'saturday',
                flex: 1
            }
        ]

    }
});





