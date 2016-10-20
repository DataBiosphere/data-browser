/**
 * ActivityLog Web Controller
 */
// Services
import * as activityLogService from "./activitylog-service";
import { setupResponseCallback } from "cc-express-utils";
import { QueryModel } from "cc-qm";


/**
 * Find all ActivityLogs
 *
 * optional ListModel query
 *
 * @param req
 * @param res
 */
export function findAllActivityLogs(req, res) {

    let qm = new QueryModel(req);
    return activityLogService.findAllActivityLogs(qm, setupResponseCallback(res));
}
