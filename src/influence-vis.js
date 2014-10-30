$(function () {

    d3.json('data/industry-engagement.json', function(error, data) {
        var SHOW_TOP_NUM = 75;

        data[0]['data'] = data[0]['data'].slice(0, SHOW_TOP_NUM)
        data[1]['data'] = data[1]['data'].slice(0, SHOW_TOP_NUM)

        new Contour({
            el: '#industry-engagement .bar-stacked',

            chart: {
                height: 20 * SHOW_TOP_NUM,
                padding: {
                    left: 325
                }
            },

            xAxis: {
                labels: {
                    formatter: function (l) {
                        return l.length > 40 ? l.slice(0, 37).trim() + '...' : l;
                    }
                }
            },

            yAxis: {
                title: 'Number of Bills',
                ticks: 4
            },

            bar: {
                stacked: true
            },

            tooltip: {
                formatter: function (t) {
                    var msg = t.y + (t.series.indexOf('Supported') != -1 ? ' bills supported by ' : ' bills opposed by ');
                    return msg + t.x;
                }
            }
        })
        .cartesian()
        .horizontal()
        .bar(data)
        .legend(data)
        .tooltip()
        .render();
    });

    d3.json('data/top-supporters.json', function(error, data) {
        var SHOW_TOP_NUM = 10;

        data[0]['data'] = data[0]['data'].slice(0, SHOW_TOP_NUM)
        data[1]['data'] = data[1]['data'].slice(0, SHOW_TOP_NUM)

        new Contour({
            el: '#top-supporters .bar-stacked',

            chart: {
                height: 25 * SHOW_TOP_NUM,
                padding: {
                    left: 325
                }
            },

            xAxis: {
                labels: {
                    formatter: function (l) {
                        return l.length > 40 ? l.slice(0, 37).trim() + '...' : l;
                    }
                }
            },

            yAxis: {
                title: 'Number of Bills',
                ticks: 4
            },

            bar: {
                stacked: true
            },

            tooltip: {
                formatter: function (t) {
                    var msg = t.y + (t.series.indexOf('Supported') != -1 ? ' bills supported by ' : ' bills opposed by ');
                    return msg + t.x;
                }
            }
        })
        .cartesian()
        .horizontal()
        .bar(data)
        .tooltip()
        .render();
    });

    d3.json('data/top-opposers.json', function(error, data) {
        var SHOW_TOP_NUM = 10;

        data[0]['data'] = data[0]['data'].slice(0, SHOW_TOP_NUM)
        data[1]['data'] = data[1]['data'].slice(0, SHOW_TOP_NUM)

        new Contour({
            el: '#top-opposers .bar-stacked',

            chart: {
                height: 25 * SHOW_TOP_NUM,
                padding: {
                    left: 325
                }
            },

            xAxis: {
                labels: {
                    formatter: function (l) {
                        return l.length > 40 ? l.slice(0, 37).trim() + '...' : l;
                    }
                }
            },

            yAxis: {
                title: 'Number of Bills',
                ticks: 4
            },

            bar: {
                stacked: true
            },

            tooltip: {
                formatter: function (t) {
                    var msg = t.y + (t.series.indexOf('Supported') != -1 ? ' bills supported by ' : ' bills opposed by ');
                    return msg + t.x;
                }
            }
        })
        .cartesian()
        .horizontal()
        .bar(data)
        .tooltip()
        .render();
    });

});
