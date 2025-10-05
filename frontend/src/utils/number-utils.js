export class NumberUtils {
    static numberToStringWithThDiv(rr) {
        return  String(rr).replace(/(\d)(?=(?:\d\d\d)+$)/g, "$1 ");
    }
}
