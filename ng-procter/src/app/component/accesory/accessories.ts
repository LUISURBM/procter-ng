import { pivotCfgI18n } from "../pivot-cfg";


export const accessories = [
    {
        "requesteddate": { type: "string" },
        loadorderid: { type: "string"},
        customerid: { type: "string"},
        deiveryid: { type: "string"},
        reg_status: { type: "string"},
        accessorytype: { type: "string"},
        costoverrun: { type: "string"},
        quantity: { type: "string"},
        salesunit: { type: "string"},
        comentarios: { type: "string"},
        enviado: { type: "string"},
        creation_date: { type: "string"},
        
    }
];

export const accessoriesCfg = {
    dataSource: {
        data: accessories
    },
    localization: pivotCfgI18n,
    options: {
        "viewType": "grid",
        "grid": {
            "type": "flat",
            "title": "",
            "showFilter": true,
            "showHeaders": true,
            "showTotals": "off",
            "showGrandTotals": "off",
            "grandTotalsPosition": "bottom",
            "showExtraTotalLabels": true,
            "showHierarchies": true,
            "showHierarchyCaptions": true,
            "drillthroughMaxRows": 1000,
            "showReportFiltersArea": true,
            "dragging": true,
            "showAutoCalculationBar": true,
            "showEmptyValues": true
        },
        "chart": {
            "type": "column",
            "title": "",
            "showFilter": true,
            "multipleMeasures": false,
            "oneLevel": false,
            "autoRange": false,
            "reversedAxes": false,
            "showLegend": true,
            "showLegendButton": false,
            "showDataLabels": false,
            "showAllLabels": false,
            "showMeasures": true,
            "showOneMeasureSelection": true,
            "showWarning": true,
            "activeMeasure": {}
        },
        "filter": {
            "weekOffset": 1,
            "dateFormat": "dd/MM/yyyy",
            "liveSearch": true
        },
        "configuratorActive": false,
        "configuratorButton": true,
        "showAggregations": true,
        "showCalculatedValuesButton": true,
        "grouping": false,
        "editing": true,
        "drillThrough": true,
        "showDrillThroughConfigurator": true,
        "sorting": "on",
        "defaultDateType": "date",
        "strictDataTypes": false,
        "datePattern": "dd/MM/yyyy",
        "dateTimePattern": "dd/MM/yyyy HH:mm:ss",
        "saveAllFormats": false,
        "showDefaultSlice": true,
        "useOlapFormatting": false,
        "showMemberProperties": false,
        "showEmptyData": true,
        "defaultHierarchySortName": "asc",
        "showOutdatedDataAlert": false,
        "showAggregationLabels": true,
        "sortAlphabetically": [],
        "showAllFieldsDrillThrough": false,
        "liveFiltering": false,
        "showFieldListSearch": false,
        "validateFormulas": true,
        "caseSensitiveMembers": false,
        "simplifyFieldListFolders": false,
        "validateReportFiles": true,
        "fieldListPosition": undefined,
        "allowBrowsersCache": false
    },
    slice: {
        columns: [
            { uniqueName: "requesteddate" },
            { uniqueName: "loadorderid" },
            { uniqueName: "customerid" },
            { uniqueName: "deiveryid" },
            { uniqueName: "reg_status" },
            { uniqueName: "accessorytype" },
            { uniqueName: "costoverrun" },
            { uniqueName: "quantity" },
            { uniqueName: "salesunit" },
            { uniqueName: "comentarios" },
            { uniqueName: "enviado" },
            { uniqueName: "creation_date" },
        ]
    }
}