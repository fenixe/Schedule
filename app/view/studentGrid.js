Ext.define('DWork.view.studentGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.studentgrid',
    id: 'studentGrid',
    title: 'Список учителей',
    store: 'studentStore',
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
            pluginId: 'rowEditingTech'
        }
    ],
    listeners: {
        select: function (el, record, item, index) {
            this.up('form').getForm().setValues(record.data);
        }
    },
    columns: [
        {
            text: 'Название группы',
            dataIndex: 'groupName',
            flex: .1,
            renderer: function (value) {
                return '<img src="images/user_green.png"> ' + value;
            },
            editor: {
                xtype: 'textfield'
            }
        },
        {
            text: 'Поток',
            dataIndex: 'flow',
            flex: 0.3,
            editor: {
                xtype: 'textfield'
            }
        },
        {
            text: 'Курс',
            dataIndex: 'course',
            width: 60,
            editor: {
                xtype: 'numberfield'
            }
        },
        {
            text: 'Институт',
            dataIndex: 'cathedra',
            width: 100,
            editor: {
                xtype: 'combobox',
                store: comboStore,
                typeAhead: true,
                minChars: 0,
                valueField: 'text',
                typeAheadDelay: 10,
                autoSelect: true,
                validateBlank: true,
                allowBlank: false
            }
        },
        {
            text: 'Год поступления',
            dataIndex: 'admisyear',
            width: 120,
            editor: {
                xtype: 'numberfield'
            }
        },
        {
            text: 'Кол-во часов в неделю',
            dataIndex: 'hourInWeek',
            width: 150,
            editor: {
                xtype: 'numberfield'
            }
        },
        {
            xtype: 'actioncolumn',
            width: 25,
            icon: 'images/delete.png',
            handler: function (view, rowIndex, colIndex, item, e, record, rew) {
                view.getStore().remove(record);
            }
        }
    ]
});