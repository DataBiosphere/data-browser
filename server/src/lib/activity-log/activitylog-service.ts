/**
 * Activity log service
 */
import { ListModelCB, Callback, OID } from "../../boardwalk";
import { ActivityEvent, ActivityLog, ActivityLogPartial } from "./activitylog-definition";
import { Person } from "../person/person-definition";

/**
 * Dependencies
 */
import * as async from "async";
import { QueryModel } from "cc-qm";

/**
 * DAOs
 */
import * as activityLogDAO from "./activitylog-dao";

/**
 * Create activity log
 *
 * @param user {Person}
 * @param userIPAddress {string}
 * @param activityEvent {ActivityEvent}
 * @param next {Callback<ActivityLog>}
 */
export function createActivityLog(user: Person,
                                  userIPAddress: string,
                                  activityEvent: ActivityEvent,
                                  next: Callback<ActivityLog>): void {

    let activityLog = buildActivityLog(user, userIPAddress, activityEvent);
    activityLogDAO.createActivityLog(activityLog, next);
}

/**
 * Find all activity logs
 *
 * @param qm {QueryModel}
 * @param next {ListModelCB<ActivityLog>}
 */
export function findAllActivityLogs(qm: QueryModel, next: ListModelCB<ActivityLog>): void {

    async.parallel<ActivityLog[] | number, Error>({

        activityLogs: (callback) => {

            return activityLogDAO.findAllActivityLogs(qm, callback);
        },

        activityLogCount: (callback) => {

            if (qm.isPaginated()) {
                const countQm = new QueryModel();
                countQm.initFrom(qm);
                countQm.setAsCountFunction();
                return activityLogDAO.findAllActivityLogs(countQm, callback);
            }
            else {
                callback();
            }
        }
    }, (error, result) => {

        if (error) {
            return next(error);
        }

        let items = result["activityLogs"] as Array<ActivityLog>;
        let count = result["activityLogCount"] as number;

        next(null, {
            items: items,
            count: count
        });
    });
}

/**
 * Build activity obj to be passed from webCtrls to this service
 *
 * @param eventType {string}
 * @param entityId {OID}
 * @param entityType {string}
 * @returns {ActivityEvent}
 */
export function buildActivityEvent(eventType: string, entityId?: OID, entityType?: string): ActivityEvent {

    let activityEvent = {
        eventType: eventType
    } as ActivityEvent;

    if (!!entityId) {

        activityEvent.entityId = entityId;
        activityEvent.entityType = entityType;
    }

    return activityEvent;
}

/*
 *  PRIVATES
 */

/**
 * Builds activity log object.
 *
 * @param user {Person}
 * @param ipAddress {string}
 * @param activityEvent {ActivityEvent}
 * @returns {ActivityLogPartial}
 */
export function buildActivityLog(user: Person, ipAddress: string, activityEvent: ActivityEvent): ActivityLogPartial {

    let activityLog = {
        user: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        email: user.email,
        client: user.client,
        activity: activityEvent.eventType,
        ipAddress: ipAddress
    } as ActivityLogPartial;

    if (!!activityEvent.entityId) {
        activityLog.entityType = activityEvent.entityType;
        activityLog.entityId = activityEvent.entityId;
    }

    return activityLog;
}
