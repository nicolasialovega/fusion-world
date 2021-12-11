var options_scatter = {
    // chart: {
    //     type: 'scatter',
    //     zoomType: 'xy',
    // },
    title: {
        text: 'Fusion triple product'
    },
    subtitle: {
        text: 'Density x Temperature x Confinement time'
    },
    xAxis: {
        title: {
            enabled: true,
            text: 'Temperature (keV)'
        },
        max: 100,
        min: 0.1,
        type: 'logarithmic',
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true
    },
    yAxis: {
        max: 100,
        min: 1e-4,
        type: 'logarithmic',
        minorTickInterval: 0.1,
        title: {
            text: 'Triple product (10^20 keV m-3 s)'
        }
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 100,
        y: 70,
        floating: true,
        backgroundColor: Highcharts.defaultOptions.chart.backgroundColor,
        borderWidth: 1
    },
    plotOptions: {
        scatter: {
            // dataLabels: {
            //     format: "{point.name}",
            //     enabled: true
            // },
            // enableMouseTracking: false,
            marker: {
                radius: 5,
                states: {
                    hover: {
                        enabled: true,
                        lineColor: 'rgb(100,100,100)'
                    }
                }
            },
            states: {
                hover: {
                    marker: {
                        enabled: false
                    }
                }
            },
            tooltip: {
                headerFormat: '<b>{point.key}</b><br>',
                pointFormat: '{point.x:.1f} keV, {point.y:.1f}E20 keV m-3 s'
            }
        },
        series: {
            point: {
              events: {
                click: function() {
                  var point = this,
                    series = point.series,
                    chart = series.chart,
                    xAxis = series.xAxis,
                    yAxis = series.yAxis;
      
                  xAxis.setExtremes(this.x - 1, this.x + 1);
                  yAxis.setExtremes(this.y - 1, this.y + 1);
      
                  chart.showResetZoom();
                }
              }
            }
          }
    },
    chart: {
        events: {
          load: function() {
          var chart = this;
          chart.renderer.text('Ignition', 500, 90)
          .attr({
            zIndex: 3,
            fill: 'white'
          })
          .add();
          chart.renderer.text('Break-even', 500, 139)
          .attr({
            zIndex: 3,
            fill: 'white',
          })
          .add();
        }
      }
    }
};

async function drawScatterPlot() {
    // todo: correct branch here
    const data_devices = await fetch('https://raw.githubusercontent.com/RemDelaporteMathurin/fusion-world/triple_product/tokamaks.json').then((r)=>r.json());

    options_scatter.series = [
    ];

    // add Q = 1
    Q_1_line = [[1.0, 2500.0942875583733], [1.0985411419875581, 1714.9753015053345], [1.2067926406393286, 1197.7632198641986], [1.3257113655901092, 851.1438869581734], [1.4563484775012439, 614.9900602396602], [1.599858719606058, 451.53153686689814], [1.7575106248547918, 336.66143445501547], [1.93069772888325, 254.75601979066803], [2.120950887920191, 195.53925187484447], [2.329951810515372, 152.15600270971797], [2.5595479226995357, 119.97061812694433], [2.8117686979742302, 95.8071467437037], [3.088843596477481, 77.46231070949905], [3.393221771895328, 63.38920050876823], [3.72759372031494, 52.48924287741738], [4.094915062380425, 43.973708985579655], [4.498432668969445, 37.270435687401864], [4.941713361323834, 31.96029395185483], [5.428675439323859, 27.73345660182535], [5.963623316594643, 24.358994344340225], [6.551285568595508, 21.66354472387492], [7.196856730011519, 19.51622595841309], [7.906043210907698, 17.817896816185335], [8.685113737513525, 16.49347499297434], [9.54095476349994, 15.486433113001869], [10.481131341546858, 14.754865436373754], [11.513953993264469, 14.268705707715629], [12.648552168552959, 14.007807059372091], [13.894954943731374, 13.960687789763906], [15.264179671752334, 14.123814828716657], [16.768329368110074, 14.501348249902515], [18.420699693267153, 15.105311193420032], [20.235896477251565, 15.956184376405462], [22.229964825261945, 17.083956471580418], [24.42053094548651, 18.52969403734699], [26.826957952797247, 20.347730231985857], [29.4705170255181, 22.60861313994855], [32.374575428176435, 25.403005350688478], [35.564803062231285, 28.84679011816591], [39.06939937054615, 33.08772037560884], [42.91934260128776, 38.31405045766529], [47.14866363457392, 44.76572324559093], [51.7947467923121, 52.74885586436088], [56.89866029018296, 62.65448525521056], [62.505519252739695, 74.98281350932315], [68.66488450042998, 90.37454712177438], [75.43120063354615, 109.65137280854935], [82.86427728546842, 133.8681772400504], [91.02981779915217, 164.38032479872948], [100.0, 202.93018603355236]]
    Q_1 = {
        type: "area",
        name: "Q=1",
        showInLegend: false,
        data: Q_1_line,
        lineColor: "#175676",
        color: "#175676",
        fillOpacity: 0.5,
        marker: {
            enabled: false
        },
        threshold: 1000
    }
    options_scatter.series.push(Q_1)

    // add Q = infty
    Q_infty_line = [[1.0, 5000.1885751167465], [1.0985411419875581, 3429.950603010669], [1.2067926406393286, 2395.5264397283972], [1.3257113655901092, 1702.2877739163469], [1.4563484775012439, 1229.9801204793205], [1.599858719606058, 
        903.0630737337963], [1.7575106248547918, 673.3228689100309], [1.93069772888325, 509.51203958133607], [2.120950887920191, 391.07850374968893], [2.329951810515372, 304.31200541943593], [2.5595479226995357, 239.94123625388866], [2.8117686979742302, 191.6142934874074], [3.088843596477481, 154.9246214189981], [3.393221771895328, 126.77840101753647], [3.72759372031494, 104.97848575483476], [4.094915062380425, 87.94741797115931], [4.498432668969445, 74.54087137480373], [4.941713361323834, 63.92058790370966], [5.428675439323859, 55.4669132036507], [5.963623316594643, 48.71798868868045], [6.551285568595508, 43.32708944774984], [7.196856730011519, 39.03245191682618], [7.906043210907698, 35.63579363237067], [8.685113737513525, 32.98694998594868], [9.54095476349994, 30.972866226003738], [10.481131341546858, 29.509730872747507], [11.513953993264469, 28.537411415431258], [12.648552168552959, 28.015614118744182], [13.894954943731374, 27.921375579527812], [15.264179671752334, 28.247629657433315], [16.768329368110074, 29.00269649980503], [18.420699693267153, 30.210622386840065], [20.235896477251565, 31.912368752810924], [22.229964825261945, 34.167912943160836], [24.42053094548651, 37.05938807469398], [26.826957952797247, 40.69546046397171], [29.4705170255181, 45.2172262798971], [32.374575428176435, 50.806010701376955], [35.564803062231285, 57.69358023633182], [39.06939937054615, 66.17544075121768], [42.91934260128776, 76.62810091533058], [47.14866363457392, 89.53144649118185], [51.7947467923121, 105.49771172872175], [56.89866029018296, 125.30897051042112], [62.505519252739695, 149.9656270186463], [68.66488450042998, 180.74909424354877], [75.43120063354615, 219.3027456170987], [82.86427728546842, 267.7363544801008], [91.02981779915217, 328.76064959745895], [100.0, 405.8603720671047]]
    Q_infty = {
        type: "area",
        name: "Ignition",
        showInLegend: false,
        data: Q_infty_line,
        lineColor: "#175676",
        color: "#175676",
        fillOpacity: 0.5,
        marker: {
            enabled: false
        },
        threshold: 1000
    }
    options_scatter.series.push(Q_infty)

    // scatter

    options_scatter.series.push({
        type: "scatter",
        name: 'Tokamaks',
        color: '#BA324F',
        data: []
    })
    options_scatter.series.push({
        type: "scatter",
        name: 'Stellarators',
        color: '#175676',
        data: []
    })
    for (var i=0; i < data_devices.length; i++){
        current_device = data_devices[i]
        if (Array.isArray(current_device.temperature)){
            temperatures = current_device.temperature
            triple_products = current_device.triple_product
        }
        else{
            temperatures = [current_device.temperature]
            triple_products = [current_device.triple_product]
        }
        for (var j=0; j < temperatures.length; j++){
            point = {
                "name": current_device.name,
                "x": temperatures[j],
                "y": triple_products[j]/1e20
            }
            switch (current_device.configuration) {
                case 'tokamak':
                    options_scatter.series[2].data.push(point);
                    break;
                case 'stellarator':
                    options_scatter.series[3].data.push(point);
                    break;
    
            }
        }

    }

    var scatterplot = Highcharts.chart('container2', options_scatter);
}


drawScatterPlot();
