Ext.define('DWork.view.scheduleMain',{
    extend : 'Ext.panel.Panel',
    alias : 'widget.schedulemain',
    title : 'Панель генирации расписания',
    frame : true,
    //height : '100%',
    layout : 'border',
    defaults :{
        border : false,
        split : true
    },
    items : [{
        flex : 1,
        region : 'west',
        xtype : 'generatrulesgrid'
    },{
        flex : 1,
        region : 'center',
        xtype : 'schedulerulesgrid'
    }]
});