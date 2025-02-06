import mongoose, { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const search = this?.query?.search;

    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: search, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };

    //filtering
    const excludeFields = ['search', 'sortBy', 'sortOrder', 'filter'];
    excludeFields.forEach((el) => delete queryObj[el]);

    if (this.query.filter) {
      const filterField = this.query.filter;
      if (mongoose.Types.ObjectId.isValid(filterField as string)) {
        queryObj['product'] = new mongoose.Types.ObjectId(
          filterField as string,
        );
      }
    }
    this.modelQuery = this.modelQuery.find(queryObj);
    return this;
  }

  sort() {
    const sortBy = this?.query?.sortBy || 'createdAt';
    const sortOrder = this?.query?.sortOrder === 'desc' ? -1 : 1;
    this.modelQuery = this.modelQuery.sort({ [sortBy as string]: sortOrder });

    return this;
  }
}

export default QueryBuilder;
