import * as mongoose from "mongoose"
import { execPaged } from "./aggregate"
import { findPaged } from "./model"

mongoose.Aggregate.prototype.execPaged = execPaged
mongoose.Model.prototype.findPaged = findPaged
