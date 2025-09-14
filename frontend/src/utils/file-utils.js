export class FileUtils {

    static LoadPageScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () =>  resolve('Script loaded: ' + src);
            script.onerror = () =>  reject(new Error(`Script error: ${src}`));
            document.body.appendChild(script);
        });
    }

    static LoadPageStyle(src,insertBeforeElement) {
        return new Promise((resolve, reject) => {
            const style = document.createElement('link');
        style.rel = 'stylesheet';
            style.type="text/css";
            style.href =  src;
            style.onload = () =>  resolve('Stily loaded: ' + src);
            style.onerror = () =>  reject(new Error(`Style load error: ${src}`));
             document.head.insertBefore(style, insertBeforeElement);
        });
    }

    static convertFileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () =>  resolve(reader.result);
            reader.onerror = () =>  reject(new Error(`Can not convert this file: ${file}`));
        });



    }
}


