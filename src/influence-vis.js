$(function () {

    var SHOW_TOP_NUM = 75;

    d3.json("data/industry-engagement.json", function(error, data) {
        data[0]["data"] = data[0]["data"].slice(0, SHOW_TOP_NUM)
        data[1]["data"] = data[1]["data"].slice(0, SHOW_TOP_NUM)

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
                    formatter: function (data) {
                        return data.length > 40 ? data.slice(0, 37).trim() + '...' : data;
                    }
                }
            },

            yAxis: {
                title: 'Number of Bills Supported and Opposed by Group'
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
