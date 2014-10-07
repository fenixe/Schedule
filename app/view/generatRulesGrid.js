function load_curriculum(storeName, formName){
    var form = formName.getForm().getValues();
    Ext.getStore(storeName).load(
        {
            params: {
                institute: form['institute'],
                flow: form['flow'],
                semester: form['semester'],
                year: form['year'],
                course: form['course']
            }
        }
    );
}

Ext.define('DWork.view.generatRulesGrid', {
    extend: 'Ext.form.Panel',
    id: 'generetRulesGrid',
    alias: 'widget.generatrulesgrid',
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
                width: 280,
                margin: '15 5 5 0',
                labelWidth: 80,
                labelAlign: 'left'
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
                                    load_curriculum('curGridStore' ,el.up('form'));
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
                                render: function(c) {
                                    new Ext.ToolTip({
                                        target: c.getEl(),
                                        html: 'Выбрать учебный план для данного института.<br>Пустое значение выбирает для все институтов'
                                    });
                                },
                                change: function (el) {
                                    load_curriculum('curGridStore' ,el.up('form'));
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
                                    load_curriculum('curGridStore' ,el.up('form'));
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
                                    load_curriculum('curGridStore' ,el.up('form'));
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
                                    load_curriculum('curGridStore' ,el.up('form'));
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
                }
            ]
        },
        {
            width: '100%',
            region: 'center',
            //xtype: 'curgrid'
        }
    ]/*,
     buttons: [
     {
     text: 'Сохранить',
     iconCls: 'icon-save',
     action: 'clear',
     handler: function (el) {
     //var form = el.up().up().getForm();
     //if (form.isValid()) {
     Ext.getStore('curGridStore').sync();
     //}
     }
     }
     ]*/
});
