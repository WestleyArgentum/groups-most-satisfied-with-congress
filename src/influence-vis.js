$(function () {

    var industryEngagementDatasets = [],
        topSupportersDatasets = [],
        topOpposersDatasets = [];

    var industryEngagementChart,
        topSupportersChart,
        topOpposersChart;

    function redrawAll(index) {
        industryEngagementChart.setData(industryEngagementDatasets[index]).render();
        topSupportersChart.setData(topSupportersDatasets[index]).render();
        topOpposersChart.setData(topOpposersDatasets[index]).render();
    }

    $('#112th-link').on('click', function() {
        redrawAll(1);
    });

    $('#113th-link').on('click', function() {
        redrawAll(0);
    });

    $('.legend').on('click', 'a', function(){
        $('.selected').toggleClass('selected');
        $(this).addClass('selected');
    })

    d3.json('data/industry-engagement.json', function(error, data) {
        var SHOW_TOP_NUM = 50;

        data[0][0]['data'] = data[0][0]['data'].slice(0, SHOW_TOP_NUM)
        data[0][1]['data'] = data[0][1]['data'].slice(0, SHOW_TOP_NUM)
        data[1][0]['data'] = data[1][0]['data'].slice(0, SHOW_TOP_NUM)
        data[1][1]['data'] = data[1][1]['data'].slice(0, SHOW_TOP_NUM)

        industryEngagementDatasets = data;

        industryEngagementChart = new Contour({
            el: '#industry-engagement .bar-stacked',

            chart: {
                height: 20 * SHOW_TOP_NUM,
                padding: {
                    left: 280
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
        .bar(industryEngagementDatasets[0])
        .legend(industryEngagementDatasets[0])
        .tooltip()
        .render();
    });

    d3.json('data/top-supporters.json', function(error, data) {
        var SHOW_TOP_NUM = 10;

        data[0][0]['data'] = data[0][0]['data'].slice(0, SHOW_TOP_NUM)
        data[0][1]['data'] = data[0][1]['data'].slice(0, SHOW_TOP_NUM)
        data[1][0]['data'] = data[1][0]['data'].slice(0, SHOW_TOP_NUM)
        data[1][1]['data'] = data[1][1]['data'].slice(0, SHOW_TOP_NUM)

        topSupportersDatasets = data;

        topSupportersChart = new Contour({
            el: '#top-supporters .bar-stacked',

            chart: {
                height: 25 * SHOW_TOP_NUM,
                padding: {
                    left: 280
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
        .bar(topSupportersDatasets[0])
        .tooltip()
        .render();
    });

    d3.json('data/top-opposers.json', function(error, data) {
        var SHOW_TOP_NUM = 10;

        data[0][0]['data'] = data[0][0]['data'].slice(0, SHOW_TOP_NUM)
        data[0][1]['data'] = data[0][1]['data'].slice(0, SHOW_TOP_NUM)
        data[1][0]['data'] = data[1][0]['data'].slice(0, SHOW_TOP_NUM)
        data[1][1]['data'] = data[1][1]['data'].slice(0, SHOW_TOP_NUM)

        topOpposersDatasets = data;

        topOpposersChart = new Contour({
            el: '#top-opposers .bar-stacked',

            chart: {
                height: 25 * SHOW_TOP_NUM,
                padding: {
                    left: 280
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
        .bar(topOpposersDatasets[0])
        .tooltip()
        .render();
    });

});
