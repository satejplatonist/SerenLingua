import AWS from 'aws-sdk';
import fs from 'fs';

export async function downloadFromS3(file_key: string,file_Name:string)
{
    try 
    {
        AWS.config.update({
            accessKeyId: process.env.NEXT_PUBLIC_AWS_ACESS_KEY_ID,
            secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACESS_KEY,
            region: 'eu-north-1',
        });
        const s3 = new AWS.S3({
            params:{
                Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
            },
            region: 'eu-north-1'
        });
        const params = {
            Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
            Key: file_key,
        }
        const object = await s3.getObject(params).promise()
        const path = require('path');
        
        const dir = path.join('D:', 'temp'); // Directory path
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true }); // Create directory if it doesn't exist
        }

        const file_name = path.join(dir, `pdf-${file_Name}.pdf`);
        fs.writeFileSync(file_name,object.Body as Uint8Array);
        return file_name;
    } catch (error) {
        console.error(error);
        return null;
    }
}