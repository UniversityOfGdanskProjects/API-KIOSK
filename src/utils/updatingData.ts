import _ from 'lodash';
import { Model } from 'mongoose';

type CompareValues = string[];

const isDifferent = <T>(
    ObjectA: T,
    ObjectB: T,
    compareValues: CompareValues
): boolean => {
    const cleanObjectA = _.pick(ObjectA, compareValues);
    const cleanObjectB = _.pick(ObjectB, compareValues);
    return !_.isEqual(cleanObjectA, cleanObjectB);
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
                        $set: _.pick(data, compareValues),
                    },
                    { new: true }
                );
            }
        } else {
            const newData = new Model(data);
            await newData.save();
        }
    };
