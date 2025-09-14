export class DateElements{
    static elementToDate(element){
        const parts = element.split("-");
        let dt= new Date(parts[0], parts[1] - 1, parts[2]);
        return dt;
    }
    static dateToValText(dt) {
        let result ={ val: '', txt: ''}
        result.txt = dt.toLocaleDateString('ru-RU');
          const parts = result.txt.split(".");
        result.val = parts[2]+'-'+parts[1]+'-'+parts[0];
        return result;
    }

}