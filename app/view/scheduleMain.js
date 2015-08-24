Ext.define('DWork.view.scheduleMain', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.schedulemain',
    frame: true,
    //height : '100%',
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    defaults: {
        border: false,
        split: true
    },
    items: [{
        flex: 1,
        title: 'Панель ограничений для преподователя и предмета',
        region: 'west',
        xtype: 'generaterulesform'
    }, {
        region: 'center',
        xtype: 'splitter'
    },{
        flex : 1,
        title: 'Панель жестких ограничений для конкретного предмета',
        region: 'east',
        xtype: 'schedulerulesgrid'
    }]
});