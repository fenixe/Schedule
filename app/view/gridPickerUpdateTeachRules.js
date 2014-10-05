Ext.define('DWork.view.gridPickerUpdateTeachRules', {
    extend: 'Ext.form.field.Picker',
    alias: 'widget.gridpickerupdateteachrules',
    editable: false,
    id: 'gridPickerUpdateTeachRules',
    autoDestroy: true,
    listeners: {
        focus: function (fld, e, opts) {
            fld.expand();
        },
        collapse: function (el) {
            Ext.getCmp('teacherUpdateRulesGrid').remove();
        },
        beforerender: function (picker) {
            var store = Ext.getStore('teacherRulesStore');
            var records = store.data.items;
            var lessWeek = store.count();
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
            var text = 'Макс. кол-во пар в неделю: ' + lessWeek + "<br>" + 'Кол-во окон: ' + count;
            picker.setValue(text);
        }
    },
    cancelEdit: function () {
        var me = this;
        me.fireEvent('blur');
        me.collapse();
    },

    collapseIf: Ext.Function.createInterceptor(Ext.form.field.Picker.prototype.collapseIf, function (e) {
        var boundList = Ext.get(e.target).up('.x-boundlist'),
            cmp;
        cmp = boundList && Ext.getCmp(boundList.id);
        if (cmp && this.picker.down('#' + cmp.pickerField.id)) {
            return false;
        }
    }),

    mimicBlur: Ext.Function.createInterceptor(Ext.form.field.Picker.prototype.collapseIf, function (e) {
        var boundList = Ext.get(e.target).up('.x-boundlist'),
            cmp;
        cmp = boundList && Ext.getCmp(boundList.id);
        if (cmp && this.picker.down('#' + cmp.pickerField.id)) {
            return false;
        }
    }),
    createPicker: function () {
        var picker = Ext.create('DWork.view.teacherRulesGrid', {
            pickerCreatId: this.id,
            id: 'teacherUpdateRulesGrid'
        });
        return picker;
    },
    initComponent: function () {
        this.callParent(arguments);
    }
});