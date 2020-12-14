import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: "ap-northeast-2"
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'four-top',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
});  //uploads 라는 폴더에 파일을 저장


//여러개의 파일을 보내려면 upload.array("file",3) 3은 파일 수 제한
export const uploadMiddleware = upload.single("file");

export const uploadController = (req, res) => {
  const { file: { location } } = req;
  res.json({ location });
}

export default upload;