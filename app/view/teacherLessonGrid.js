function lessSetTextField(grid) {
    var picker = Ext.getCmp(grid.pickerCreatId);
    var records = grid.getStore().data.items;
    var text = '';
    records.forEach(function (el) {
        if (text == '') {
            text += '"' + el.data.lessonName + '"';
        } else {
            text += ', "' + el.data.lessonName + '"';
        }
    });
    picker.setValue(text);
}

Ext.define('DWork.view.teacherLessonGrid', {
    extend: 'Ext.grid.Panel',
    store: 'teacherLessonStore',
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
    minHeight: 200,
    maxHeight: 200,
    minWidth: 500,
    width: 500,
    style: {
        borderColor: '#FFDBA0',
        borderWidth: 3,
        borderStyle: 'solid'
    },
    plugins: [
        {
            ptype : 'cellediting',
            clicksToEdit: 2,
            listeners: {
                edit: function (editor, context, eOpts) {
                    var grid = context.grid;
                    var value = context.value;
                    var editor = context.column.getEditor();
                    var editXType = editor.getXType();
                    if (editXType === 'combobox') {
                        try{
                            context.record.data['_id'] = editor.getStore().findRecord('lessonName', value).data['_id'];
                        }catch(ex){}
                        lessSetTextField(grid);
                    }
                }
            }
        }
    ],
    tbar: [
        {
            xtype: 'button',
            text: 'Создать запись',
            iconCls: 'icon-add',
            handler: function (btn) {
                var celleditor = btn.up().up().getPlugin();
                celleditor.cancelEdit();
                var r = Ext.create('DWork.model.teacherLessonModel');
                btn.up().up().getStore().insert(0, r);
                celleditor.startEdit(r, 0);
            }
        },
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
        }
    ],
    columns: [
        {
            text: 'Перечень предметов',
            dataIndex: 'lessonName',
            flex: 1,
            allowBlank: false,
            editor: {
                xtype: 'combobox',
                store: 'lessonsStore',
                displayField: 'lessonName',
                typeAhead: true,
                triggerAction: 'query',
                minChars: 0,
                typeAheadDelay: 10,
                autoSelect: true,
                validator: function (val) {
                    var me = this;
                    var indRecord = me.getStore().find(me.valueField, val);
                    if (Ext.isEmpty(val) || !(indRecord < 0)) {
                        return true;
                    }
                    return "Несуществующие значение";
                }

            }
        },
        {
            text: 'Кол-во часов в неделю',
            dataIndex: 'hourInWeek',
            width: 130,
            editor: {
                xtype: 'numberfield'
            }
        }
    ]
});