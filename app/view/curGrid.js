Ext.define('DWork.view.curGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.curgrid',
    id: 'curGrid',
    title: 'Учебный план',
    store: 'curGridStore',
    flex: 2,
    columnLine: true,
    border: false,
    multiSelect: true,
    autoDestroy: true,
    autoScroll: true,
    forceFit: true,
    listeners: {
        afterrender: function (el) {
            var form = el.up('form').getForm().getValues();
            el.getStore().load(
                { params: {
                    institute: form['institute'],
                    flow: form['flow'],
                    semester: form['semester'],
                    year: form['year'],
                    course: form['course']
                }}
            );
        }
    },
    plugins: [
        {
            ptype: 'rowediting',
            clicksToEdit: 2,
            cancelBtnText: 'Отмена',
            saveBtnText: 'Сохранить',
            pluginId: 'rowEditingCur',
            errorSummary: false,
            listeners: {
                beforeedit: function (editor, comtext) {
                    Ext.getStore('teacherStore').load();
                    Ext.getStore('lessonsStore').load();
                },
                edit: function (editor, context) {
                    context.grid.getStore().sync();
                },
                canceledit: function (editor, context) {
                    if (context.record.phantom) {
                        context.grid.getStore().remove(context.record);
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
            handler: function () {
                var form = Ext.getCmp('curriculumForm').getForm();
                var formValue = Ext.getCmp('curriculumForm').getForm().getValues();
                if (form.isValid()) {
                    var roweditor = Ext.getCmp('curGrid').getPlugin('rowEditingCur');
                    roweditor.cancelEdit();
                    var r = Ext.create('DWork.model.curGridModel', {
                        institute: formValue['institute'],
                        flow: formValue['flow'],
                        semester: formValue['semester'],
                        year: formValue['year'],
                        course: formValue['course'],
                        employDuration: formValue['employDuration']
                    });
                    Ext.getCmp('curGrid').getStore().insert(0, r);
                    roweditor.startEdit(0, 0);
                } else {
                    var message = '';
                    Ext.Object.getKeys(formValue).forEach(function (rec, id, ert) {
                        if (Ext.isEmpty(formValue[rec])) {
                            var fieldLabel = form.findField(rec).fieldLabel;
                            message += '<li style="margin-left: 15%; list-style-type: none;">"' + fieldLabel + '"</li>';
                        }
                    });
                    Ext.Msg.alert('Пустое поле(-я)', 'Данные поле(-я) не заполнены :  <b>' + message + '</b>');
                }
            }
        },
        {
            xtype: 'button',
            text: 'Удалить запись',
            iconCls: 'icon-delete',
            handler: function () {
                var selection = Ext.getCmp('curGrid').getView().getSelectionModel().getSelection();
                if (selection) {
                    Ext.getCmp('curGrid').getStore().remove(selection);
                    Ext.getCmp('curGrid').getStore().sync();

                }
            }
        }
    ],
    columns: [
        {
            text: 'Название предмета',
            dataIndex: 'lessonName',
            flex: 1,
            tooltip: 'Перечень предметов учебного плана',
            editor: {
                xtype: 'combobox',
                store: 'lessonsStore',
                displayField: 'lessonName',
                itemId: 'lessonName',
                valueField: 'lessonName',
                typeAhead: true,
                minChars: 0,
                triggerAction: 'query',
                typeAheadDelay: 10,
                autoSelect: true,
                validateBlank: true,
                emptyText: 'Выбрать предмет для учебного плана',
                trigger2Cls: 'x-form-clear-trigger',
                onTrigger2Click: function () {
                    var me = this;
                    me.clearValue();
                },
                onTriggerClick: function () {
                    var me = this;
                    if (!me.readOnly && !me.disabled) {
                        if (me.isExpanded) {
                            me.collapse();
                        } else {
                            var teachName = me.up().down('#teachName').value;
                            me.getStore().load({
                                params: {teacher: teachName},
                                callback: function (rec, oper, success) {
                                    if (success) {
                                        me.expand()
                                    }
                                }
                            });
                        }
                        me.inputEl.focus();
                    }
                },
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
            text: 'Тип предмета',
            dataIndex: 'subType',
            flex: 0.5,
            editor: {
                xtype: 'combobox',
                store: typeStore,
                typeAhead: true,
                minChars: 0,
                typeAheadDelay: 10,
                autoSelect: true,
                emptyText: 'Выбрать форму провидения урока'
            }
        },
        {
            text: 'Преподователь',
            dataIndex: 'teachName',
            flex: 1,
            editor: {
                xtype: 'combo',
                store: 'teacherStore',
                itemId: 'teachName',
                displayField: 'teachName',
                typeAhead: true,
                valueNotFoundText: 'no data',
                minChars: 0,
                typeAheadDelay: 10,
                triggerAction: 'query',
                autoSelect: true,
                emptyText: 'Выбрать преподователя',
                trigger2Cls: 'x-form-clear-trigger',
                onTrigger2Click: function () {
                    var me = this;
                    me.clearValue();
                },
                onTriggerClick: function () {
                    var me = this;
                    if (!me.readOnly && !me.disabled) {
                        if (me.isExpanded) {
                            me.collapse();
                        } else {
                            var lessonName = me.up().down('#lessonName').value;
                            me.getStore().load({
                                params: {lesson: lessonName},
                                callback: function (records, operation, success) {
                                    if (success) {
                                        me.expand()
                                    }
                                }
                            });
                        }
                        me.inputEl.focus();
                    }
                },
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
            text: 'Колличество часов в семестр',
            dataIndex: 'hoursSemester',
            flex: .5,
            editor: {
                xtype: 'numberfield',
                minValue: 0
            }
        },
        {
            text: 'Максимальное число пар в неделю',
            dataIndex: 'maxLessWeek',
            flex: .5,
            editor: {
                xtype: 'numberfield',
                minValue: 0
            }
        }
    ]
});