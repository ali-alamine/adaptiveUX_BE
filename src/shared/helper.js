import { EventTypes } from "../config/enums";

function getEnteredValue(arr, id, event_type) {
    if (event_type == EventTypes.ADD) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].attr_id == id) {
                return JSON.parse(arr[i].entered_value);
            }
        }
    } else if (event_type == EventTypes.DELETE) {
        
    }

    return null;

}

module.exports = { getEnteredValue }