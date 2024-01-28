import userModel from "../Database/Models/userModels.js";

class APIFeatures {
  constructor(req) {
    this.req = req;
  }

  // Filtering
  filter() {
    const ForbiddenFields = ["sort", "page", "limit", "fields"];

    const queryObj = { ...this.req.query };

    for (const key of Object.keys(queryObj)) {
      if (ForbiddenFields.includes(key)) delete queryObj[key];
    }

    this.query = userModel.find(queryObj);
    return this;
  }

  // Sort
  sort() {
    if (this.req.query.sort) {
      this.query = this.query.sort(this.req.query.sort.split(",").join(" "));
    } else {
      this.query = this.query.sort("userName");
    }
    return this;
  }

  //Select
  select() {
    if (this.req.query.fields) {
      this.query = this.query.select(
        this.req.query.fields.split(",").join(" ")
      );
    } else {
      this.query = this.query.select("userName role active");
    }
    return this;
  }

  // Pagination
  paginate() {
    if (this.req.query.page) {
      let page = this.req.query.page * 1;
      const limit = this.req.query.limit * 1 || 20;
      this.query = this.query.skip(--page * limit).limit(limit);
    } else {
      this.query = this.query.skip(0).limit(20);
    }
    return this;
  }
}

export default APIFeatures;
