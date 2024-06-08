class middleware{
    static numnberIdEnum = ['e','p','f','r'];
    static checkNumberId(req, res, next){
        if(req.params['numberId']){
            if(!(req.params['numberId']).includes(middleware.numnberIdEnum)){
                res.status(400).json({success:false,message: "numberId must be e, p, f or r"});
            }else{
                next();
            }
        } else {
            res.status(400).json({success:false,message: "numberId is required in the params"});
        }
    }
}

module.exports = middleware;