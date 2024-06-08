class middleware{
    static numberIdEnum = new Set(['p', 'f', 'e', 'r']);
    static checkNumberId(req, res, next){
        var numberId = req.params['numberId'];
        if(numberId){
            if(!middleware.numberIdEnum.has(numberId)){
                res.status(400).json({success:false,message: "numberId must be e, p, f or r"});
            }else{
                next();
            }
        } else {
            res.status(400).json({success:false,message: "numberId is required in the params"});
        }
    }

    static async testServerAuth(){
        try {
            const response = await axios.get(`${TEST_SERVER_URL}${numberId}`, { timeout: TIMEOUT });
            if (response.status === 200) {
                const numbers = response.data.numbers || [];
                return numbers.filter(num => !slidingWindow.includes(num));
            }
        } catch (error) {
            console.error(error.message);
        }

    }

}

module.exports = middleware;