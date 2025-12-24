module.exports.createPost = (req,res,next) =>{
  if(!req.body.name){
    req.flash('error', 'Vui lòng nhập tiêu đề!');
    res.redirect(req.get("Referrer") || "/");
    return
  }

  next();
}

