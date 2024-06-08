const axios = require('axios');
class helper{
    static testServerIp = 'http://20.244.56.144';
    static authData = {
        "companyName": "AffordMed",
        "clientID": "e5b84e3a-8ba1-421b-8675-cb79a1cd5d1c",
        "clientSecret": "mPOUMvLIHcnqnQGt",
        "ownerName": "uditya prakash",
        "ownerEmail": "uditya2110115@akgec.ac.in",
        "rollNo": "2100270100173"
    };
    static async testServerAuth(){
        try {
            const response = await axios.post(`${helper.testServerIp}/test/auth`,this.authData, {timeout:500});
            if (response) {
                return response.data;
            }else{
                return null;
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    static isTokenValid(data) {
        // Calculate the expiration time
        const expirationTime = data; // expires_in is the expiration timestamp in seconds
    
        // Get the current time in seconds
        const currentTime = Math.floor(Date.now() / 1000);
    
        // Check if the token is expired
        return currentTime < expirationTime;
    }

    static async getNumFromTestServer(auth, code){
        try {
            console.log(code);
            const response = await axios.get(`${helper.testServerIp}/test/${code}`, {
                headers:{
                    "Authorization": `Bearer ${auth.token}`,
                },
                timeout:5000});  
            if (response) {
                return response.data;
            }else{
                return null;
            }
        } catch (error) {
            console.error(error.message);
        }
    }
    static mapNumberIdToType(numberId){
        switch (numberId) {
            case 'p':
                return 'primes';
            case 'f':
                return 'fibo';
            case 'e':
                return 'even';
            case 'r':
                return 'rand';
            default:
                return null;
        }
    }
    static updateTheWindow(num,WINDOW_SIZE,uniqueNumbers,currentWindow){
        const windowPrevState = [...currentWindow];
        currentWindow = currentWindow.concat(num.filter(num => !uniqueNumbers.has(num)));
        currentWindow = currentWindow.slice(-WINDOW_SIZE);

        num.forEach(num => uniqueNumbers.add(num));
        currentWindow = [...new Set(currentWindow)]; 

        while (currentWindow.length > WINDOW_SIZE) {
            const oldestNum = currentWindow.shift();
            uniqueNumbers.delete(oldestNum);
        }

        const windowCurrState = [...currentWindow];
        const average = currentWindow.length > 0 ? currentWindow.reduce((acc, num) => acc + num, 0) / currentWindow.length : 0;

        return { windowPrevState, windowCurrState, average, uniqueNumbers, currentWindow};
        }
}

module.exports = helper;