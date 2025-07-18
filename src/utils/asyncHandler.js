

const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch(next);
  };
};

export { asyncHandler };


// const asyncHandler =(fn)=> async(req, res, next)=>{
//     try{
//         await fn(req, res, next);       
//     } catch(error){
//         res.status(error.code || 500).json({
//             success: false, 
//             message: error.message || 'Internal Server Error',
//             error: error.stack || 'No stack trace available'    
//         });  
//         next(error); // Call next with the error to pass it to the global error handler
//         }
// }
