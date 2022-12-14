/*
// Flot
*/

// Initializes the flot chart plugin and attaches the
// plugin to elements according to its type

(function() {
    'use strict';

    $(initChartDemo);

    /**
     * Global object to load data for charts using ajax
     * Request the chart data from the server via post
     * Expects a response in JSON format to init the plugin
     * Usage
     *   chart = new floatChart('#id', 'server/chart-data.php')
     *   ...
     *   chart.requestData(options);
     *
     * @param  Chart element placeholder or selector
     * @param  Url to get the data via post. Response in JSON format
     */
    window.FlotChart = function(element, url) {
        // Properties
        this.element = $(element);
        this.url = url;

        // Public method
        this.requestData = function(option, method, callback) {
            var self = this;

            // support params (option), (option, method, callback) or (option, callback)
            callback = method && $.isFunction(method) ? method : callback;
            method = method && typeof method == 'string' ? method : 'POST';

            self.option = option; // save options

            $.ajax({
                url: self.url,
                cache: false,
                type: method,
                dataType: 'json'
            }).done(function(data) {
                $.plot(self.element, data, option);

                if (callback) callback();
            });

            return this; // chain-ability
        };

        // Listen to refresh events
        this.listen = function() {
            var self = this,
                chartCard = this.element.parents('.card')[0];
            // attach custom event
            chartCard.addEventListener('card.refresh', function(event) {
                // request data and remove spinner when done
                self.requestData(self.option, 'GET', function() {
                    event.detail.card.removeSpinner();
                });
            });

            return this; // chain-ability
        };
    };

    //
    // Start of Demo Script
    //
    function initChartDemo() {
        // Bar chart
        (function() {
            var Selector = '.chart-bar';
            $(Selector).each(function() {
                var source = $(this).data('source') || $.error('Bar: No source defined.');
                var chart = new FlotChart(this, source),
                    option = {
                        series: {
                            bars: {
                                align: 'center',
                                lineWidth: 0,
                                show: true,
                                barWidth: 0.6,
                                fill: 0.9
                            }
                        },
                        grid: {
                            borderColor: '#eee',
                            borderWidth: 1,
                            hoverable: true,
                            backgroundColor: '#fcfcfc'
                        },
                        tooltip: true,
                        tooltipOpts: {
                            content: '%x : %y'
                        },
                        xaxis: {
                            tickColor: '#fcfcfc',
                            mode: 'categories'
                        },
                        yaxis: {
                            tickColor: '#eee'
                        },
                        shadowSize: 0
                    };
                // Send Request
                chart.requestData(option, 'GET');
            });
        })();
        // Bar Stacked chart
        (function() {
            var Selector = '.chart-bar-stacked';
            $(Selector).each(function() {
                var source = $(this).data('source') || $.error('Bar Stacked: No source defined.');
                var chart = new FlotChart(this, source),
                    option = {
                        series: {
                            stack: true,
                            bars: {
                                align: 'center',
                                lineWidth: 0,
                                show: true,
                                barWidth: 0.6,
                                fill: 0.9
                            }
                        },
                        grid: {
                            borderColor: '#eee',
                            borderWidth: 1,
                            hoverable: true,
                            backgroundColor: '#fcfcfc'
                        },
                        tooltip: true,
                        tooltipOpts: {
                            content: '%x : %y'
                        },
                        xaxis: {
                            tickColor: '#fcfcfc',
                            mode: 'categories'
                        },
                        yaxis: {
                            tickColor: '#eee'
                        },
                        shadowSize: 0
                    };
                // Send Request
                chart.requestData(option, 'GET');
            });
        })();
        // Area chart
        (function() {
            var Selector = '.chart-area';
            $(Selector).each(function() {
                var source = $(this).data('source') || $.error('Area: No source defined.');
                var chart = new FlotChart(this, source),
                    option = {
                        series: {
                            lines: {
                                show: true,
                                fill: 0.8
                            },
                            points: {
                                show: true,
                                radius: 4
                            }
                        },
                        grid: {
                            borderColor: '#eee',
                            borderWidth: 1,
                            hoverable: true,
                            backgroundColor: '#fcfcfc'
                        },
                        tooltip: true,
                        tooltipOpts: {
                            content: '%x : %y'
                        },
                        xaxis: {
                            tickColor: '#fcfcfc',
                            mode: 'categories'
                        },
                        yaxis: {
                            tickColor: '#eee',
                            tickFormatter: function(v) {
                                return v + ' visitors';
                            }
                        },
                        shadowSize: 0
                    };

                // Send Request and Listen for refresh events
                chart.requestData(option, 'GET').listen();
            });
        })();
        // Line chart
        (function() {
            var Selector = '.chart-line';
            $(Selector).each(function() {
                var source = $(this).data('source') || $.error('Line: No source defined.');
                var chart = new FlotChart(this, source),
                    option = {
                        series: {
                            lines: {
                                show: true,
                                fill: 0.01
                            },
                            points: {
                                show: true,
                                radius: 4
                            }
                        },
                        grid: {
                            borderColor: '#eee',
                            borderWidth: 1,
                            hoverable: true,
                            backgroundColor: '#fcfcfc'
                        },
                        tooltip: true,
                        tooltipOpts: {
                            content: '%x : %y'
                        },
                        xaxis: {
                            tickColor: '#eee',
                            mode: 'categories'
                        },
                        yaxis: {
                            tickColor: '#eee'
                        },
                        shadowSize: 0
                    };
                // Send Request
                chart.requestData(option, 'GET');
            });
        })();
        // P??e
        (function() {
            var Selector = '.chart-pie';
            $(Selector).each(function() {
                var source = $(this).data('source') || $.error('Pie: No source defined.');
                var chart = new FlotChart(this, source),
                    option = {
                        series: {
                            pie: {
                                show: true,
                                innerRadius: 0,
                                label: {
                                    show: true,
                                    radius: 0.8,
                                    formatter: function(label, series) {
                                        return (
                                            '<div class="flot-pie-label">' +
                                            //label + ' : ' +
                                            Math.round(series.percent) +
                                            '%</div>'
                                        );
                                    },
                                    background: {
                                        opacity: 0.8,
                                        color: '#222'
                                    }
                                }
                            }
                        }
                    };
                // Send Request
                chart.requestData(option, 'GET');
            });
        })();
        // Donut
        (function() {
            var Selector = '.chart-donut';
            $(Selector).each(function() {
                var source = $(this).data('source') || $.error('Donut: No source defined.');
                var chart = new FlotChart(this, source),
                    option = {
                        series: {
                            pie: {
                                show: true,
                                innerRadius: 0.5 // This makes the donut shape
                            }
                        }
                    };
                // Send Request
                chart.requestData(option, 'GET');
            });
        })();
    }
})();
