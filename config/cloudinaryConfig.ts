import { Cloudinary } from "@cloudinary/url-gen";
import { UploadApiOptions } from 'cloudinary-react-native';
export const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.EXPO_PUBLIC_CLOUD_NAME,
    apiKey: process.env.EXPO_PUBLIC_CLOUDINARY_API_KEY,
  },
  url:{
    secure:true
  }
});


export const options: UploadApiOptions = {
  upload_preset: "todoist",
  unsigned: true,
  // tag: "sample",
};