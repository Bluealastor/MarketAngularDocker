import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import {S3Client} from '@aws-sdk/client-s3';
import { AbstractService } from './abstractservice';
import { ImageDTO } from 'src/dto/imagedto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductDTO } from 'src/dto/productdto';
@Injectable({
  providedIn: 'root'
})
export class ImageService extends AbstractService<ImageDTO>{
  s3:S3Client;
  getAll(): Observable<ImageDTO[]> {
    return this.http.get<ImageDTO[]>(environment.APIEndpoint + 'image/getall');
}

  constructor(http: HttpClient) {
    super(http);
    this.s3 = new S3Client(
      { credentials:{
             accessKeyId: environment.aws.accessKeyId,
              secretAccessKey: environment.aws.secretAccessKey
        },
        region: environment.aws.region,
    });
  }
  insert(imagedto: ImageDTO): Observable<any> {
    console.log(imagedto)
    return this.http.post('http://localhost:8080/image/insert', imagedto);
  }
  

  uploadImage(file: File): Promise<string> {
    const uniqueId = file.name+Date.now()+Math.random().toString(36).substring(2);
    const params = {
      Bucket: environment.aws.bucketName,
      Key:uniqueId,
      Body: file,
      ACL: 'public-read',
      ContentType: file.type
    };

    return new Promise<string>((resolve, reject) => {
      try {
        const response = this.s3.send(new PutObjectCommand(params));
        console.log("SUCCESS", response)
        resolve(` https://${environment.aws.bucketName}.s3.${environment.aws.region}.amazonaws.com/${params.Key}`)
        console.log(resolve)
    } catch(error) {
        reject(error)
      }
  })} 
}