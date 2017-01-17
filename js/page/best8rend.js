var Best8Rend = function(){
    var that = this;
    that.prop = {
        columnChart: {}
    };
    
    that.data = {
        rendimientos: [],
        options: {}
    };

    that.dom = {
        $spLastUp : $('#spLastUp')
    };

    that.init = function(){
        google.charts.load('current', {packages: ['corechart', 'bar']});
        google.charts.setOnLoadCallback(that.method.drawChart);
    };

    that.method = {
        drawChart: function(){
            that.data.options = {
                animation: {
                    startup: true,
                    duration: 1000,
                    easing: 'out'
                },
                annotations: {                     
                    textStyle: {
                        fontSize: 30,
                        bold: true
                    }
                },
                colors: ['#3366CC', '#008000'],
                displayAnnotations: true,
                legend: { 
                    position: 'top', 
                    maxLines: 1,
                    textStyle: {
                        fontSize: 25,
                        bold: true
                    }
                },
                bar: { 
                    groupWidth: '75%' 
                },
                //isStacked: 'absolute',
                chartArea: {
                    top: '5%',
                    bottom: '45%',
                    right: '5%',
                    left: '25%'
                },
                height: $(window).outerHeight(true) - 10,
                width: $(window).outerWidth(true) - 10,
                vAxis: {
                    textPosition: 'none'
                },
                hAxis: {
                    maxTextLines: 2,
                    maxAlternation: 1,
                    minTextSpacing: 1,
                    title: '',
                    textStyle: {
                        fontSize: 25,
                        bold: true
                    }
                }
            };

            that.prop.columnChart = new google.visualization.ColumnChart(document.getElementById('chart_div'));

            setInterval(function(){
                that.method.getRendimientos();
            }, 30000);

            that.method.getRendimientos();
        },
        getRendimientos: function(){
            var dataAjax = new DataAjax({
                url: 'http://localhost:5000/8ren',
                dataType: 'jsonp',
                crossDomain: true
            });
            dataAjax.method.GetData(function(data){
                var arrData = $.map(data[0], function(item, key){
                    return [[item.nombre, item.cantidad_ramos, item.cantidad_ramos, 'fill-color:#3366CC', item.cantidad_ramos_totales, item.cantidad_ramos_totales, 'fill-color:green;fill-opacity:0.8;']];
                });

                arrData.unshift(['nombre', 'Ramos Ult. Hora (25)', { role: 'annotation' }, {role: 'style'}, 'Ramos Dia (25)', { role: 'annotation' }, {role: 'style'}]);
                that.data.rendimientos = google.visualization.arrayToDataTable(arrData);

                that.prop.columnChart.draw(that.data.rendimientos, that.data.options);
                that.dom.$spLastUp.text(moment(new Date()).format('DD/MM/YYYY hh:mm:ss'));
            });
        }
    };

    that.fn = {

    };
};