import {IResponse} from 'Interfaces/response';

export default class NetUtils {
    static request(url: string, options: any): Promise<IResponse> {
        return fetch(url, options)
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                console.log(error);
                return {code: -1, message: '网络连接失败！'};
            });
    }

    static postForm(url: string, data: any): Promise<IResponse> {

        let body = "";
        for(let key in data) {
            if (body !== "") {
                body += "&&"
            }
            body += key+"="+data[key]
        }

        const fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            credentials: 'include',
            body: body
        };
        return NetUtils.request(url, fetchOptions);
    }

    static postJson(url: string, data: any): Promise<IResponse> {
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data)
        };
        return NetUtils.request(url, fetchOptions);
    }

    static graphqlJson(url: string, data: any): Promise<IResponse> {
        // console.log('graphqlJson url' + url + '; data=' + data);
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/graphql'
            },
            credentials: 'include',
            body: data
        };
        return NetUtils.request(url, fetchOptions);
    }

    static get(url: string, data: any): Promise<IResponse> {
        let urlStr: string = "";
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                if (urlStr === '') {
                    urlStr = '?';
                } else {
                    urlStr += '&';
                }
                urlStr += data[key];
            }
        }
        url += urlStr;
        return NetUtils.request(url, null);
    }

    static getJson(url: string, data: any): Promise<IResponse> {
        let urlStr: string = "";
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                if (urlStr === '') {
                    urlStr = '?';
                } else {
                    urlStr += '&';
                }
                urlStr += data[key];
            }
        }
        url += urlStr;
        return NetUtils.request(url, null);
    }
}
