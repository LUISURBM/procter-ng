import { pivotCfgI18n } from "../pivot-cfg";



export const rejects = [
    {
        "loadorderid": { type: 'sring' },
        "creation_date": { type: 'sring' },
        "rejectdate": { type: 'sring' },
        "invoiceid": { type: 'sring' },
        "deliveryid": { type: 'sring' },
        "quantity": { type: 'sring' },
        "reason": { type: 'sring' },
        "salesunit": { type: 'sring' },
        "referencenumber": { type: 'sring' },
        "rejecttype": { type: 'sring' },
    }
];

export const rejectsCfg = {
    dataSource: {
        data: rejects
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
            "grandTotalsPosition": "top",
            "showExtraTotalLabels": false,
            "showHierarchies": true,
            "showHierarchyCaptions": true,
            "drillthroughMaxRows": 1000,
            "showReportFiltersArea": true,
            "dragging": true,
            "showAutoCalculationBar": true,
            "showEmptyValues": false
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
            "liveSearch": false
        },
        "configuratorActive": false,
        "configuratorButton": true,
        "showAggregations": true,
        "showCalculatedValuesButton": true,
        "grouping": false,
        "editing": false,
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
        "showAllFieldsDrillThrough": true,
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
            { uniqueName: "loadorderid" },
            { uniqueName: "creation_date" },
            { uniqueName: "rejectdate" },
            { uniqueName: "invoiceid" },
            { uniqueName: "loadorderid" },
            { uniqueName: "deliveryid" },
            { uniqueName: "quantity" },
            { uniqueName: "reason" },
            { uniqueName: "salesunit" },
            { uniqueName: "referencenumber" },
            { uniqueName: "rejecttype" },
        ],
    }
}
