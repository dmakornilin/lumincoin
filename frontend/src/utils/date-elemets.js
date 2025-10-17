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


    static current_date_rus() {
        let dt = new Date();
        return dt.toLocaleDateString('ru-RU');
    }

    static current_week_iso() {
        let dt = new Date();
        const wd=dt.getDay()-1;
        if (wd!==0) {
            dt.setDate(dt.getDate() - wd);
        }
        const value=dt.toLocaleDateString('ru-RU');
        const parts = value.split(".");
        let result=parts[2]+'-'+parts[1]+'-'+parts[0];
        return result;
    }


    static current_date_iso() {
        let dt = new Date();
        const value=dt.toLocaleDateString('ru-RU');
        const parts = value.split(".");
        let result=parts[2]+'-'+parts[1]+'-'+parts[0];
        return result;
    }


    static current_mes_iso() {
        let dt = new Date();
        const value=dt.toLocaleDateString('ru-RU');
        const parts = value.split(".");
        let result=parts[2]+'-'+parts[1]+'-01';
        return result;
    }

    static current_year_iso() {
        let dt = new Date();
        const value=dt.toLocaleDateString('ru-RU');
        const parts = value.split(".");
        let result=parts[2]+'-01-01';
        return result;
    }



    static stringRusdtTovalDt(value) {
        const parts = value.split(".");
        let result=parts[2]+'-'+parts[1]+'-'+parts[0];
        return result;

    }


    static dtStrToString(dt){
        const parts = dt.split("-");
        let result=parts[2]+'.'+parts[1]+'.'+parts[0];
        return result;

    }

}