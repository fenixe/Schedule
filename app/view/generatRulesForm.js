Ext.define('DWork.view.generatRulesForm', {
    extend: 'Ext.form.Panel',
    id: 'generatRulesForm',
    alias: 'widget.generatrulesform',
    frame: true,
    minWidth: 500,
    collapsible: true,
    startCollapsed: false,
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
                margin: '5 5 5 0',
                labelWidth: 80,
                labelAlign: 'left'
            },
            maxHeight: 120,
            minHeight: 120,
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
                                    load_curriculum('curGridStore', el.up('form'));
                                }
                            }
                        }, {
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
                                    load_curriculum('curGridStore', el.up('form'));
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
                        }, {
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
                                    load_curriculum('curGridStore', el.up('form'));
                                }
                            }
                        }
                    ]
                }, {
                    items: [
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
                                    load_curriculum('curGridStore', el.up('form'));
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
                        }, {
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
                                    load_curriculum('curGridStore', el.up('form'));
                                }
                            }
                        }, {
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
            xtype: 'generatrulesgrid'
        }
    ]
});
