function load_schedule_rules(storeMainName, storeName, formName){
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
            callback: function(records, operation, success) {
                if (success){
                    load_curriculum(storeName, formName);
                }
            }
        }
    );

}
Ext.define('DWork.view.scheduleRulesForm', {
    extend: 'Ext.form.Panel',
    id: 'scheduleRulesForm',
    alias: 'widget.schedulerulesform',
    frame: true,
    defaults: {
        border: false,
        split: true
    },
    layout: 'border',
    items: [
        {
            xtype: 'fieldset',
            layout: 'hbox',
            defaults: {
                frame: true,
                width: 270
            },
            maxHeight: 100,
            minHeight: 100,
            collapsible: true,
            region: 'north',
            items: [
                {
                    items: [
                        {
                            fieldLabel: 'Учебный год',
                            xtype: 'numberfield',
                            name: 'year',
                            minValue: 2010,
                            maxValue: 2100,
                            value: new Date().getFullYear(),
                            allowBlank: false,
                            blankText: 'Поле пустое',
                            listeners: {
                                change: function (el) {
                                    load_schedule_rules('curGridStore','scheduleRulesStore' ,el.up('form'));
                                }
                            }
                        },
                        {
                            fieldLabel: 'Институт',
                            xtype: 'combobox',
                            store: comboStore,
                            typeAhead: true,
                            minChars: 0,
                            value: 'ИПСА',
                            valueField: 'text',
                            displayField: 'text',
                            typeAheadDelay: 10,
                            autoSelect: true,
                            name: 'institute',
                            validateBlank: true,
                            allowBlank: false,
                            blankText: 'Поле пустое',
                            listeners: {
                                render: function (c) {
                                    new Ext.ToolTip({
                                        target: c.getEl(),
                                        html: 'Выбрать учебный план для данного института.<br>Пустое значение выбирает для все институтов'
                                    });
                                },
                                change: function (el) {
                                    load_schedule_rules('curGridStore','scheduleRulesStore' ,el.up('form'));
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
                    ]
                },
                {
                    items: [
                        {
                            fieldLabel: 'Семестр',
                            xtype: 'numberfield',
                            name: 'semester',
                            value: 1,
                            minValue: 1,
                            maxValue: 2,
                            allowBlank: false,
                            blankText: 'Поле пустое',
                            listeners: {
                                change: function (el) {
                                    load_schedule_rules('curGridStore','scheduleRulesStore' ,el.up('form'));
                                }
                            }
                        },
                        {
                            fieldLabel: 'Поток',
                            xtype: 'combobox',
                            store: flowStore,
                            typeAhead: true,
                            minChars: 0,
                            value: 'Системы искусственного интилекта',
                            valueField: 'text',
                            displayField: 'text',
                            typeAheadDelay: 10,
                            autoSelect: true,
                            name: 'flow',
                            validateBlank: true,
                            allowBlank: false,
                            blankText: 'Поле пустое',
                            listeners: {
                                change: function (el) {
                                    load_schedule_rules('curGridStore','scheduleRulesStore' ,el.up('form'));
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
                    ]
                },
                {
                    items: [
                        {
                            fieldLabel: 'Курс',
                            xtype: 'numberfield',
                            name: 'course',
                            value: 1,
                            minValue: 1,
                            maxValue: 6,
                            allowBlank: false,
                            blankText: 'Поле пустое',
                            listeners: {
                                change: function (el) {
                                    load_schedule_rules('curGridStore','scheduleRulesStore' ,el.up('form'));
                                }
                            }
                        },
                        {
                            fieldLabel: 'Длительность занятия',
                            xtype: 'numberfield',
                            name: 'employDuration',
                            allowDecimals: true,
                            value: 1.5,
                            decimalPrecision: 1,
                            allowBlank: false,
                            blankText: 'Поле пустое'
                        }
                    ]
                },
                {
                    items: [
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Кол-во пар в день',
                            minValue: 1,
                            itemId : 'numLess',
                            maxValue: 8,
                            listeners: {
                                afterrender : function(el){
                                    Ext.getStore('scheduleRulesStore').on('load', function(store, records){
                                        el.setValue(records.length);
                                    });
                                },
                                change: function (el, newValue) {
                                    var grid = el.up().up().up().down('grid');
                                    var size = grid.getStore().count();
                                    var formValue = el.up('form').getForm().getValues();
                                    if (newValue > size) {
                                        var  arr = [];
                                        for (var i = size; i < newValue; i++) {
                                            var r = Ext.create('DWork.model.scheduleRulesModel', {
                                                institute: formValue['institute'],
                                                flow: formValue['flow'],
                                                semester: formValue['semester'],
                                                year: formValue['year'],
                                                course: formValue['course'],
                                                numLesson: i+1
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
                            listeners: {
                                change: function (el, newValue) {
                                    var grid = el.up().up().up().down('grid');
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
                                                { name: 'week-1:saturday', type: 'string'}
                                            ),
                                            new Ext.data.Field(
                                                { name: 'week-2:saturday', type: 'string'}
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
                    ]
                }
            ]
        },
        {
            width: '100%',
            region: 'center',
            xtype: 'schedulerulesgrid'
        }
    ]
});
