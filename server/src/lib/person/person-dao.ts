/**
 * Person DAO
 */

/**
 * Types
 */
import { PersonPartial, Person } from "./person-definition";
import { Callback } from "../../boardwalk";

/**
 * Dependencies
 */
import { queryBuilder, QueryModel } from "cc-qm";

/**
 * Model
 */
import { PersonModel } from "./person";

/**
 * Create Person
 *
 * @param person
 * @param next
 */
export function createPerson(person: PersonPartial, next: Callback<Person>): void {

    PersonModel.create(person, next);
}

/**
 * Find All People
 *
 * @param qm
 * @param next
 */
export function findAllPeople(qm: QueryModel, next: Callback<Person[]|number>): void {

    let query = PersonModel.find({});
    queryBuilder.buildQuery(query, qm);
    query.exec(next);
}

/**
 * Save Person
 *
 * @param person
 * @param next
 */
export function savePerson(person: Person, next: Callback<Person>): void {

    person.save((error, savedPerson) => {

        if (error) {
            return next(error);
        }
        next(null, savedPerson);
    });
}

/**
 * Find Person
 *
 * @param qm
 * @param next
 */
export function findPerson(qm: QueryModel, next: Callback<Person>): void {

    let query = PersonModel.findOne({});
    queryBuilder.buildQuery(query, qm);
    query.exec(next);
}

/**
 * Update Person
 *
 * @param qm
 * @param updates
 * @param next
 */
export function updatePerson(qm: QueryModel, updates: PersonPartial, next: Callback<Person>): void {

    let query = PersonModel.findOne({});
    queryBuilder.buildQuery(query, qm);
    updates.updatedAt = new Date();

    query.findOneAndUpdate({},
        updates,
        { new: true },
        next
    );
}
