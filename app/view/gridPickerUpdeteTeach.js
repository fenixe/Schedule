Ext.define('DWork.view.gridPickerUpdeteTeach', {
    extend: 'Ext.form.field.Picker',
    alias: 'widget.gridpickerupdeteteach',
    editable: false,
    id: 'gridPickerUpdeteTeach',
    listeners: {
        focus: function (fld, e, opts) {
            fld.expand();
        },
        deactivate: function (picker) {
            var records = Ext.getStore('teacherLessonStore').data.items;
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
        var picker = Ext.create('DWork.view.teacherLessonGrid', {
            pickerCreatId: this.id,
            id: 'lessonGridUpdTeach'
        });
        return picker;
    },
    initComponent: function () {
        this.callParent(arguments);
    }
});