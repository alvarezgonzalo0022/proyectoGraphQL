
export const imgFileFilter = (req: Express.Request, file: Express.Multer.File, callback: Function) => {

    if(!file) callback(new Error('No file provided'), false) 
    
    const fileExtension = file.mimetype.split('/')[1];
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

    if(allowedExtensions.includes(fileExtension)) callback(null, true);

    callback(null, false);
}
