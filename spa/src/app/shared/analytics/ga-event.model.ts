/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of a Google Analytics event, containing a category, action and label, as well as any custom dimensions
 * applicable to the event.
 * 
 * category - GTM "event" variable, used as "Category" value for GA
 * action - used as "Action" value for GA
 * label - used as "Label" value for GA
 * dimensions - additional variables that correspond to GTM variables and in turn, GA dimensions
 * 
 * Action and label values are optional, in the case where we are sending a custom pageview event.
 */

// App dependencies
import { GACategory } from "./ga-category.model";
import { GAAction } from "./ga-action.model";

export interface GAEvent {
    category: GACategory;
    action?: GAAction;
    label?: string;
    dimensions?: {[key: string]: string};
}
