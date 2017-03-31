const aws = require('aws-sdk');
const keys = require('./keys');

const AWS_ACCESS_KEY = keys.AWSAccessKeyId;
const AWS_SECRET_KEY = keys.AWSSecretKey;
const AWS_REGION = keys.AWSRegion;
const AWS_SIGNATURE_VERSION = keys.AWSSignatureVersion;
const S3_BUCKET = keys.s3_bucket;

module.exports = {
    getSignedUrl: function(req, res, next) {
        aws.config.update({
            accessKeyId: AWS_ACCESS_KEY,
            secretAccessKey: AWS_SECRET_KEY
        });
        aws.config.update({
            region: AWS_REGION,
            signatureVersion: AWS_SIGNATURE_VERSION
        });
        var s3 = new aws.S3();
        var s3_params = {
            Bucket: S3_BUCKET,
            Key: req.query.file_name,
            Expires: 60,
            ContentType: req.query.file_type,
            ACL: 'public-read'
        };
        s3.getSignedUrl('putObject', s3_params, function(err, data) {
            if (err) return next(err);
            var return_data = {
                signed_request: data,
                url: `https://${S3_BUCKET}.s3.amazonaws.com/${req.query.file_name}`
            };
            res.json(return_data);
        });
    }
};
