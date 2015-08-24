Ext.define('DWork.view.mainPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mainpanel',
    id: 'mainPanel',
    flex: 1,
    title: 'Панель управлния',
    frame: true,
    height: '100%',
    layout: 'fit',
    items: [
        {
            //xtype: 'curform'
            //xtype: 'studentform'
            //xtype : 'teacherform'
            //xtype : 'lessonsgrid'
            //xtype : 'schedulerulesform'
            xtype : 'schedulemain'
        }
    ]
});
