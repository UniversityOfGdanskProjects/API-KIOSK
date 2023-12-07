type UpdateOrCreateFunction<RecordType, CompareType> = (
    comparisonObject: any,
    record: RecordType,
    compareValues: CompareType
) => Promise<void>;

export const enumerateData = <RecordType, CompareType>(
    records: RecordType[],
    compareValues: CompareType,
    updateOrCreateData: UpdateOrCreateFunction<RecordType, CompareType>,
    generateComparisonObject: (record: RecordType) => any
) => {
    if (records && records.length > 0) {
        records.forEach(async (record: RecordType) => {
            const comparisonObject = generateComparisonObject(record);
            await updateOrCreateData(comparisonObject, record, compareValues);
        });
    }
};
