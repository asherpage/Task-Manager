const authorize = (req, res,next) =>{
    const {apiKey} = req.query
    if (apiKey==='ping'){
        console.log("Authorized access granted")
        req.user = {name:'jimmy johns', id:123456}
        next()
    } else {
        console.log('Authorized access denied')
        res.send({results:[], status:401, message:"Acess denied"})
    }
}
module.exports = authorize

