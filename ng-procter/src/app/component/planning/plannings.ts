import { pivotCfgI18n } from "../pivot-cfg";


export const plannings = [
    {
        reg_status: { type: "string" },
        loadid: { type: "string" },
        originlocationid: { type: "string" },
        vehicletype: { type: "string" },
        totalweightsum: { type: "string" },
        totalvolumesum: { type: "string" },
        totalpiecessum: { type: "string" },
        totaldeliverycount: { type: "string" },
        loadorderid: { type: "string" },
        licenseplate: { type: "string" },
        drivername: { type: "string" },
        drivercc: { type: "string" },
        creation_date: { type: "string" },
        creation_user: { type: "string" },
        last_update: { type: "string" },
        user_update: { type: "string" },
    }
];

export const planningsCfg = {
    dataSource: {
        data: plannings
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
            { uniqueName: "reg_status" },
            { uniqueName: "loadid" },
            { uniqueName: "originlocationid" },
            { uniqueName: "vehicletype" },
            { uniqueName: "totalweightsum" },
            { uniqueName: "totalvolumesum" },
            { uniqueName: "totalpiecessum" },
            { uniqueName: "totaldeliverycount" },
            { uniqueName: "loadorderid" },
            { uniqueName: "licenseplate" },
            { uniqueName: "drivername" },
            { uniqueName: "drivercc" },
            { uniqueName: "creation_date" },
            { uniqueName: "creation_user" },
            { uniqueName: "last_update" },
            { uniqueName: "user_update" },
        ]
    }
}