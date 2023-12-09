type UpdateOrCreateFunction<RecordType, CompareType> = (
    comparisonObject: object,
    record: RecordType,
    compareValues: CompareType
) => Promise<void>;

/**
 *
 * @param records - Records fetched from a scraper that will be compared to existing records.
 * @param compareValues - Values used for comparison to detect changes in them.
 * @param updateOrCreateData - Function used to compare, update or create data
 * @param generateComparisonObject - It returns an object representing the unique identifier/key to search records.
 */

export const enumerateData = <RecordType, CompareType>(
    records: RecordType[],
    compareValues: CompareType,
    updateOrCreateData: UpdateOrCreateFunction<RecordType, CompareType>,
    generateComparisonObject: (record: RecordType) => object
) => {
    if (records && records.length > 0) {
        records.forEach(async (record: RecordType) => {
            const comparisonObject = generateComparisonObject(record);
            await updateOrCreateData(comparisonObject, record, compareValues);
        });
    }
};
