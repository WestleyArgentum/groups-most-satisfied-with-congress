$(function () {

    d3.json("/data/industry-engagement.json", function(error, data) {
        new Contour({
            el: '.bar-stacked',

            chart: {
                height: 20 * data[0].data.length,
                padding: {
                    left: 325
                }
            },

            xAxis: {
                labels: {
                    formatter: function (data) {
                        return data.length > 40 ? data.slice(0, 37).trim() + '...' : data;
                    }
                }
            },

            yAxis: {
                title: 'Industry Engagement'
            },

            bar: {
                stacked: true
            },

            legend: {
                vAlign: 'top'
            }
        })
        .cartesian()
        .horizontal()
        .bar(data)
        .legend(data)
        .tooltip()
        .render();
    });

});
