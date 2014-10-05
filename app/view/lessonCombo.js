Ext.define('DWork.view.lessonCombo', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.lessoncombo',
    store: 'curGridStore',
    //id: 'lessonCombo',
    queryMode: 'local',

    typeAhead: true,
    minChars: 0,
    valueField: '_id',
    displayField: 'lessonName',
    typeAheadDelay: 10,
    autoSelect: true,
    validateBlank: true,
    trigger2Cls: 'x-form-clear-trigger',
    onTrigger2Click: function () {
        var me = this;
        me.clearValue();
    },
    blankText: 'Поле пустое',
    listConfig: {
        getInnerTpl: function () {
            return '<strong>{lessonName}</strong>' +
                '<div class="rate">{subType}</div>' +
                '<div class="rate">{teachName}</div>';
        }
    }
    /*validator: function (val) {
        var me = this;
        var indRecord = me.getStore().find(me.valueField, val);
        if (Ext.isEmpty(val) || !(indRecord < 0)) {
            return true;
        }
        return "Несуществующие значение";
    }*/
});