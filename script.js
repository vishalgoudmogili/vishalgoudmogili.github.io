// Plot 1
const vega_lite_spec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "data": { url: "processed_data.csv" },
  "mark": { "type": "circle", "filled": true },
  "encoding": {
    "x": { "field": "BUS_COUNT", "type": "quantitative", "title": "Bus Count" },
    "y": { "field": "SPEED", "type": "quantitative", "title": "Average Speed" },
    "size": { "field": "LENGTH", "type": "quantitative", "title": "Segment Length" }
  },
  "title": "Bubble Chart",
  "width": 400,
  "height": 250,
};
 
vegaEmbed("#vis1", vega_lite_spec, { "actions": false }).then(result => {
  // Callback function, executed after the embedding is complete
  console.log(result);
});
 
// Plot 2
const boxplot = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "description": "A vertical box plot showing median, min, and max.",
  "data": { url: "processed_data.json" },
  "mark": {
    "type": "boxplot",
    "extent": "min-max"
  },
  "encoding": {
    "x": { "field": "MONTH", "type": "nominal" },
    "color": { "field": "MONTH", "type": "quantitative" },
    "y": {
      "field": "SPEED",
      "type": "quantitative"
    }
  },
  "title": "Box Plot",
  "width": 400,
  "height": 250,
};
 
vegaEmbed("#vis2", boxplot, { "actions": false }).then(result => {
  // Callback function, executed after the embedding is complete
  console.log(result);
});
 
// Plot 3
const vegascatter = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "description": "A scatterplot showing horsepower and miles per gallons for various cars.",
  "data": { url: "processed_data.json" },
  "mark": "point",
  "encoding": {
    "x": { "field": "LENGTH", "type": "quantitative", "title": "Segment Length" },
    "y": { "field": "SPEED", "type": "quantitative", "title": "Speed" }
  },
  "title": "Scatter Plot",
  "width": 400,
  "height": 250,
};
 
vegaEmbed("#vis3", vegascatter, { "actions": false }).then(result => {
  // Callback function, executed after the embedding is complete
  console.log(result);
});
 
// Plot 4
const heatmap = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "data": { url: "processed_data.csv" },
  "title": "Heatmap of Congestion by Hour and Day",
  "config": {
    "view": {
      "strokeWidth": 0,
      "step": 13
    },
  },
  "mark": "rect",
  "encoding": {
    "x": {
      "field": "DAY_OF_WEEK",
      "type": "ordinal",
      "title": "Day of the week",
    },
    "y": {
      "field": "HOUR",
      "type": "ordinal",
      "title": "Hour of the day"
    },
    "color": {
      "field": "SPEED",
      "type": "quantitative",
    }
  },
  "width": 350,
  "height": 300,
};
 
vegaEmbed("#vis4", heatmap, { "actions": false }).then(result => {
  // Callback function, executed after the embedding is complete
  console.log(result);
});

const vis7 = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "data": { url: "processed_data_linked.csv" },
  "transform": [
    {"aggregate": [{"op": "mean", "field": "SPEED", "as": "average_speed"}], "groupby": ["STREET"]},
    {"window": [{"op": "rank", "as": "rank"}], "sort": [{"field": "average_speed", "order": "descending"}]}
  ],
  "layer": [
    {
      "selection": {
        "barHover": {"type": "single", "encodings": ["x"], "on": "mouseover", "empty": "none"}
      },
      "mark": "bar",
      "encoding": {
        "x": {"field": "STREET", "type": "nominal", "sort": "-y", "title": "Street"},
        "y": {"field": "average_speed", "type": "quantitative", "title": "Average Speed"},
        "opacity": {
          "condition": {"selection": "barHover", "value": 1},
          "value": 0.7
        },
        "tooltip": [
          {"field": "STREET", "title": "Street"},
          {"field": "average_speed", "title": "Average Speed"}
        ]
      },
      "width": 800,
      "height": 600
    },
    {
      "transform": [
        {"filter": {"selection": "barHover"}}
      ],
      "mark": "line",
      "encoding": {
        "x": {"field": "STREET", "type": "nominal", "title": "Street"},
        "y": {"field": "SPEED", "type": "quantitative", "title": "Speed"}
      },
      "width": 400,
      "height": 200
    }
  ]
}

vegaEmbed("#vis7", vis7, { "actions": true }).then(result => {
  // Callback function, executed after the embedding is complete
  console.log(result);
});

const vis8 = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "data": { url: "processed_data_linked.csv" },
  "vconcat": [
    {
      "selection": {
        "streetName": {
          "type": "single",
          "on": "mouseover",
          "fields": ["STREET"]
        }
      },
      "mark": "line",
      "encoding": {
        "x": {
          "field": "HOUR",
          "type": "ordinal",
          "title": "Hour of the Day"
        },
        "y": {
          "aggregate": "average",
          "field": "SPEED",
          "type": "quantitative",
          "title": "Average Speed"
        },
        "color": {
          "field": "STREET",
          "type": "nominal",
          "scale": {"scheme": "category20"}
        },
        "opacity": {
          "condition": {"selection": "streetName", "value": 1},
          "value": 0.2
        }
      }
    },
    {
      "mark": "point",
      "encoding": {
        "x": {
          "field": "STREET",
          "type": "nominal",
          "title": "Street Name"
        },
        "y": {
          "aggregate": "sum",
          "field": "BUS_COUNT",
          "type": "quantitative",
          "title": "Number of Buses"
        },
        "size": {"value": 800},
        "color": {
          "field": "STREET",
          "type": "nominal",
          "scale": {"scheme": "category20"}
        },
        "opacity": {
          "condition": {"selection": "streetName", "value": 1},
          "value": 0.2
        }
      },
      "transform": [
        {
          "filter": {"selection": "streetName"}
        }
      ]
    }
  ]
}

vegaEmbed("#vis8", vis8, { "actions": true }).then(result => {
  // Callback function, executed after the embedding is complete
  console.log(result);
});


const vis9 = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "data": { url: "processed_data_linked.csv" },
  "vconcat": [
    {
      "width": 350,
      "height": 200,
      "mark": "line",
      "selection": {
        "click": {"type": "multi", "encodings": ["color"]}
      },
      "encoding": {
        "x": {"field": "TIME", "type": "temporal", "title": "Time"},
        "y": {"field": "SPEED", "type": "quantitative", "title": "Speed"},
        "color": {
          "condition": {"selection": "click", "field": "STREET", "type": "nominal", "title": "Street"},
          "value": "lightgray"
        },
        "tooltip": [
          {"field": "STREET", "type": "nominal"},
          {"field": "TIME", "type": "temporal"},
          {"field": "SPEED", "type": "quantitative"}
        ]
      }
    },
    {
      "width": 350,
      "height": 200,
      "mark": "rect",
      "transform": [{"filter": {"selection": "click"}}],
      "encoding": {
        "x": {"field": "HOUR", "type": "ordinal", "title": "Hour"},
        "y": {"field": "DAY_OF_WEEK", "type": "ordinal", "title": "Day of Week"},
        "color": {
          "field": "SPEED",
          "type": "quantitative",
          "aggregate": "average",
          "scale": {"scheme": "viridis"},
          "title": "Average Speed"
        },
        "tooltip": [
          {"field": "HOUR", "type": "ordinal"},
          {"field": "DAY_OF_WEEK", "type": "ordinal"},
          {"field": "SPEED", "type": "quantitative", "aggregate": "average"}
        ]
      }
    }
  ],
  "config": {
    "axis": {"labelFontSize": 12, "titleFontSize": 14},
    "legend": {"labelFontSize": 12, "titleFontSize": 14}
  }
}

vegaEmbed("#vis9", vis9, { "actions": true }).then(result => {
  // Callback function, executed after the embedding is complete
  console.log(result);
});

const vis10 = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "data": { url: "processed_data_linked.csv" },
  "vconcat": [
    {
      "width": 350,
      "mark": "bar",
      "selection": {
        "StreetSelector": {"type": "multi", "fields": ["STREET"], "empty": "all"}
      },
      "encoding": {
        "x": {"field": "STREET", "type": "nominal", "title": "Street", "axis": {"labelAngle": -45}},
        "y": {"field": "SPEED", "type": "quantitative", "title": "Average Congestion (Speed)"},
        "color": {
          "condition": {"selection": "StreetSelector", "value": "steelblue"},
          "value": "lightgray"
        },
        "tooltip": [
          {"field": "STREET", "type": "nominal"},
          {"field": "SPEED", "type": "quantitative"}
        ]
      }
    },
    {
      "width": 350,
      "height": 200,
      "transform": [{"filter": {"selection": "StreetSelector"}}],
      "mark": "circle",
      "encoding": {
        "x": {"field": "BUS_COUNT", "type": "quantitative", "title": "Bus Count"},
        "y": {"field": "SPEED", "type": "quantitative", "title": "Congestion Level (Speed)"},
        "color": {
          "field": "LENGTH",
          "type": "quantitative",
          "scale": {"scheme": "viridis"},
          "title": "Segment Length (miles)"
        },
        "size": {"value": 60},
        "tooltip": [
          {"field": "STREET", "type": "nominal"},
          {"field": "BUS_COUNT", "type": "quantitative"},
          {"field": "SPEED", "type": "quantitative"},
          {"field": "LENGTH", "type": "quantitative"}
        ]
      }
    }
  ],
  "config": {
    "axis": {"labelFontSize": 12, "titleFontSize": 14},
    "legend": {"labelFontSize": 12, "titleFontSize": 14}
  },
  "title": "Top 10 Congested Streets and Bubble Chart"
}

vegaEmbed("#vis10", vis10, { "actions": true }).then(result => {
  // Callback function, executed after the embedding is complete
  console.log(result);
});

