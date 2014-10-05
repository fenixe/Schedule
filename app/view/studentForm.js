Ext.define('DWork.view.studentForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.studentform',
    id: 'studentForm',
    border: false,
    layout: 'border',
    defaults: {
        border: false,
        split: true
    },
    items: [
        {
            xtype: 'fieldset',
            width: '100%',
            region: 'north',
            collapsible: true,
            fieldDefaults: {
                labelAlign: 'left',
                msgTarget: 'side',
                labelWidth: 160,
                width: 500,
                submitValue: true,
                margin: 10
            },
            items: [
                {
                    frame: true,
                    border: false,
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Название группы',
                            name: 'groupName'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Поток',
                            name: 'flow'
                        },
                        {
                            fieldLabel: 'Год поступления',
                            xtype: 'numberfield',
                            name: 'admisyear',
                            value: 2010,
                            minValue: 2005,
                            maxValue: 2100,
                            listeners: {
                                change: function (el, val) {
                                    var curentYear = new Date().getFullYear();
                                    var cours = curentYear - val;
                                    if (cours >= 1 && cours <= 6) {
                                        el.up('form').getForm().findField('course').setValue(cours)
                                    }
                                },
                                beforerender: function (el) {
                                    var curentYear = new Date().getFullYear();
                                    var cours = curentYear - el.getValue();
                                    if (cours >= 1 && cours <= 6) {
                                        el.up('form').getForm().findField('course').setValue(cours)
                                    }
                                }
                            }
                        },
                        {
                            fieldLabel: 'Курс',
                            xtype: 'numberfield',
                            name: 'course',
                            minValue: 1,
                            maxValue: 6
                        },
                        {
                            fieldLabel: 'Институт',
                            name: 'cathedra',
                            xtype: 'combobox',
                            store: comboStore,
                            typeAhead: true,
                            minChars: 0,
                            value: 'ИПСА',
                            valueField: 'text',
                            typeAheadDelay: 10,
                            autoSelect: true,
                            validateBlank: true,
                            allowBlank: false
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Колличество часов в неделю',
                            name: 'hourInWeek',
                            value: 1,
                            minValue: 1,
                            maxValue: 100
                        }
                    ],
                    bbar: [
                        '->', {
                            xtype: 'button',
                            text: 'Сохранить',
                            iconCls: 'icon-save',
                            handler: function (btn) {
                                var form = btn.up('form').getForm().getValues();
                                Ext.getStore('studentStore').add(form);
                            }
                        }, {
                            xtype: 'button',
                            iconCls: 'icon-cancel',
                            text: 'Сбросить',
                            handler: function (btn) {
                                btn.up('form').getForm().reset();
                            }
                        }
                    ]
                }
            ]
        },
        {
            region: 'center',
            xtype: 'studentgrid'
        }
    ]
});