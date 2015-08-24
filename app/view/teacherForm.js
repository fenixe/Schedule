Ext.define('DWork.view.teacherForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.teacherform',
    id: 'teacherForm',
    border: false,
    layout: 'border',
    defaults: {
        border: false,
        split: false
    },
    items: [
        {
            xtype: 'fieldset',
            width: '100%',
            region: 'north',
            fieldDefaults: {
                labelAlign: 'left',
                msgTarget: 'side',
                labelWidth: 160,
                width: 500,
                submitValue: true,
                margin: 10
            },
            collapsible: true,
            items: [
                {
                    frame: true,
                    border: false,
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'ФИО преподователя',
                            name: 'teachName'
                        },
                        {
                            fieldLabel: 'Институт',
                            name: 'institute',
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
                            fieldLabel: 'Кафедра',
                            name: 'cathedra',
                            xtype: 'textfield'
                        },
                        {
                            xtype: 'gridpickernewteach',
                            fieldLabel: 'Наименование предметов',
                            name: 'teachLess'
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Колличество часов в неделю',
                            name: 'hourInWeek'
                        },
                        {
                            xtype: 'gridpickernewteachrules',
                            fieldLabel: 'Предпочтение',
                            name: 'teachRules'
                        }
                    ],
                    bbar: [
                        '->', {
                            xtype: 'button',
                            text: 'Сохранить',
                            iconCls: 'icon-save',
                            handler: function (btn) {
                                var form = btn.up('form').getForm().getValues();
                                var teachLessData = Ext.getStore('teacherLessonStore').data.items;
                                var teachRulesData = Ext.getStore('teacherRulesStore').data.items;
                                var teachLessOut = [];
                                var teachRulesOut = [];
                                teachLessData.forEach(function (el) {
                                    teachLessOut.push(el.data);
                                });
                                teachRulesData.forEach(function (el) {
                                    teachRulesOut.push(el.data);
                                });
                                form['prefeRules'] = form['teachRules'];
                                form.teachLess = teachLessOut;

                                form.teachRules = teachRulesOut;
                                console.log(form);

                                Ext.getStore('teacherStore').add(form);
                                Ext.getStore('teacherStore').sync();
                            }
                        }, {
                            xtype: 'button',
                            text: 'Сбросить',
                            iconCls: 'icon-cancel',
                            handler: function (btn) {
                                btn.up('form').getForm().reset();
                                Ext.getStore('teacherLessonStore').removeAll();
                            }
                        }
                    ]
                }
            ]
        },
        {
            region: 'center',
            xtype: 'teachergrid'
        }
    ]
});