Ext.define('DWork.view.scheduleMain',{
    extend : 'Ext.panel.Panel',
    alias : 'widget.schedulemain',
    frame : true,
    //height : '100%',
    layout : 'border',
    defaults :{
        border : false,
        split : true
    },
    items : [{
        flex : 1,
        title : 'Панель ограничений для преподователя и предмета',
        region : 'west',
        xtype : 'generatrulesform'
    },{
        flex : 1,
        title : 'Панель жестких ограничений для предмета',
        region : 'center',
        xtype : 'schedulerulesgrid'
    }]
});