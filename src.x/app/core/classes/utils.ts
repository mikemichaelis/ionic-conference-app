export class Util {

    // For checking if a string is empty, null or undefined
    public static isEmpty(str) {
        return (!str || 0 === str.length);
    }

    // For checking if a string is blank, null or undefined

    public static isBlank(str) {
        return (!str || /^\s*$/.test(str));
    }

    // For checking if a string is blank or contains only white-space:
    // String.prototype.isEmpty = function() {
    //     return (this.length === 0 || !this.trim());
    // };
}