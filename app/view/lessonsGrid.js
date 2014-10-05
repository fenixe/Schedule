Ext.define('DWork.view.lessonsGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.lessonsgrid',
    store: 'lessonsStore',
    id: 'lessonsGrid',
    columnLine: true,
    border: false,
    multiSelect: true,
    autoDestroy: false,
    autoScroll: true,
    forceFit: true,
    plugins: [
        {
            ptype: 'rowediting',
            clicksToEdit: 2,
            cancelBtnText: 'Отмена',
            saveBtnText: 'Сохранить',
            pluginId: 'rowLessonEdit',
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
    tbar: [
        {
            xtype: 'button',
            text: 'Создать запись',
            iconCls: 'icon-add',
            handler: function (btn) {
                var celleditor = btn.up().up().getPlugin('rowLessonEdit');
                celleditor.cancelEdit();
                var r = Ext.create('DWork.model.lessonsModel');
                btn.up().up().getStore().insert(0, r);
                celleditor.startEdit(r, 0);
            }
        },
        {
            xtype: 'button',
            text: 'Удалить запись',
            iconCls: 'icon-delete',
            handler: function (btn) {
                var selection = btn.up().up().getView().getSelectionModel().getSelection();
                if (selection) {
                    btn.up().up().getStore().remove(selection);
                }
                btn.up().up().getStore().sync();
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
                xtype: 'textfield'
            }
        },
        {
            text: 'Перечеь аудиторий для пердмета(через запятую)',
            dataIndex: 'auditForLesson',
            width: 330,
            editor: {
                xtype: 'textfield'
            }
        }
    ]
});