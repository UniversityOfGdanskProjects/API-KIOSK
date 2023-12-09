type UpdateOrCreateFunction<RecordType, CompareType> = (
    comparisonObject: object,
    record: RecordType,
    compareValues: CompareType
) => Promise<void>;

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
