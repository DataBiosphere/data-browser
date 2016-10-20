/**
 * Passport config
 */

/**
 * Dependencies
 */
import * as passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { authenticate } from "../auth/auth-service";
import { PersonModel, STATUS } from "../person/person";
import { ResponseError } from "cc-express-utils";


/**
 * Serialize
 */
passport.serializeUser((user, done) => {

    done(null, user._id);
});

/**
 * Deserialize
 */
passport.deserializeUser((id, done) => {

    PersonModel.findById(id, done);
});

/**
 * Configure Local Passport
 */
passport.use(new LocalStrategy({
        usernameField: "email",
        passwordField: "password"
    },
    (email, password, done) => {

        // Sanitize email
        email = email.trim().toLowerCase();

        PersonModel.findOne({ email: email }, (error, person) => {

            if (error) {
                return done(error);
            }

            if (!person) {
                return done(new ResponseError("Invalid username and password combination", 422));
            }

            if (!person.active) {
                return done(new ResponseError("This account has not been activated", 403));
            }

            if (person.status === STATUS.SUSPENDED) {
                return done(new ResponseError("This account is suspended", 403));
            }

            authenticate(person._id, password, (error, isValid) => {

                if (error) {
                    return done(error);
                }

                if (!isValid) {
                    return done(new ResponseError("Invalid username and password combination", 422));
                }

                let now = new Date();

                // this.is.stupid.typing.in.mongoose()
                PersonModel.findByIdAndUpdate(person._id.toString(), { lastLogin: now, lastSeen: now }, done);
            });
        });
    }
));

export default passport;