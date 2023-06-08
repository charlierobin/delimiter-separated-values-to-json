window.com = window.com || {};

if (window.com.charlierobin === undefined) window.com.charlierobin = {};

if (window.com.charlierobin.dsvtojson === undefined) {
    window.com.charlierobin.dsvtojson = {};
} else {
    throw new Error("window.com.charlierobin.dsvtojson already defined");
}

(function (me) {

    // private properties

    // public properties

    // public methods

    me.convertTabSeparatedValuesToObject = function (tsvData, config = {}) {

        return convertDelimiterSeparatedValues(tsvData, config, "\t", "\n");
    };

    me.convertCommaSeparatedValuesToObject = function (csvData, config = {}) {

        return convertDelimiterSeparatedValues(csvData, config, ",", "\n");
    };

    // private methods

    function convertDelimiterSeparatedValues(data, config, dataDelimiter, lineDelimiter) {

        const fieldNamesRowIndex = config.fieldNamesRowIndex || -1;
        const fieldTypesRowIndex = config.fieldTypesRowIndex || -1;

        var fieldNames = config.fieldNames || null;
        var fieldTypes = config.fieldTypes || null;

        const rows = data.split(lineDelimiter);

        for (i = 0; i < rows.length; i++) {
            rows[i] = rows[i].trim();
        }

        fieldNames = fieldNamesRowIndex > -1 ? rows[fieldNamesRowIndex].split(dataDelimiter) : fieldNames;
        fieldTypes = fieldTypesRowIndex > -1 ? rows[fieldTypesRowIndex].split(dataDelimiter) : fieldTypes;

        const startRow = config.startRow || 0;

        const items = [];

        for (i = startRow; i < rows.length; i++) {

            if (i == fieldNamesRowIndex) continue;
            if (i == fieldTypesRowIndex) continue;

            const thisRowData = rows[i].split(dataDelimiter);

            const thisRowObject = {};

            for (j = 0; j < thisRowData.length; j++) {

                var value = thisRowData[j];

                if (fieldTypes !== null) {
                    if (fieldTypes[j] === "number") {
                        value = parseFloat(value);
                    }
                }

                const fieldName = fieldTypes !== null ? fieldNames[j] : j;

                thisRowObject[fieldName] = value;
            }

            items.push(thisRowObject);
        }

        return items;
    }

}(window.com.charlierobin.dsvtojson));

