import { pick, isEqual } from 'lodash';
import { Model } from 'mongoose';

type CompareValues = string[];

const isDifferent = <T>(
    ObjectA: T,
    ObjectB: T,
    compareValues: CompareValues
) => {
    const cleanObjectA = pick(ObjectA, compareValues);
    const cleanObjectB = pick(ObjectB, compareValues);
    return !isEqual(cleanObjectA, cleanObjectB);
};

export const createUpdateFunction =
    <T>(Model: Model<T>) =>
    async (
        filter: object,
        data: Partial<T>,
        compareValues: CompareValues
    ): Promise<void> => {
        const existingData = await Model.findOne(filter);

        if (existingData) {
            const isAnyFieldDifferent = isDifferent(
                existingData,
                data,
                compareValues
            );

            if (isAnyFieldDifferent) {
                await Model.findOneAndUpdate(
                    filter,
                    {
                        $set: pick(data, compareValues),
                    },
                    { new: true }
                );
            }
        } else {
            const newData = new Model(data);
            await newData.save();
        }
    };
