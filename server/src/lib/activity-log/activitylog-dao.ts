/**
 * Activity Log DAO
 */


/**
 * Types
 */
import { Callback } from "../../boardwalk";
import { ActivityLog, ActivityLogPartial } from "./activitylog-definition";

/**
 * Dependencies
 */
import { queryBuilder, QueryModel } from "cc-qm";

/**
 * Model
 */
import { ActivityLogModel } from "./activitylog";


/**
 * Create new activity log
 *
 * @param activityLog {ActivityLogPartial}
 * @param next {Callback<ActivityLog>}
 */
export function createActivityLog(activityLog: ActivityLogPartial, next: Callback<ActivityLog>) {

    ActivityLogModel.create(activityLog, next);
}

/**
 * Find all activity logs
 *
 * @param qm {Object}
 * @param next {Callback<ActivityLog[]|number>}
 */
export function findAllActivityLogs(qm: QueryModel, next: Callback<ActivityLog[]|number>) {

    let query = ActivityLogModel.find({});

    queryBuilder.buildQuery(query, qm);
    query.exec(next);
}