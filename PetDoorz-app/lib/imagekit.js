import ImageKit from "imagekit-javascript";
import { urlEndpoint, publicKey, authenticationEndpoint } from "../config/imagekit";

const imagekitConfigOptions = { urlEndpoint };
if (publicKey) imagekitConfigOptions.publicKey = publicKey;
if (authenticationEndpoint) imagekitConfigOptions.authenticationEndpoint = authenticationEndpoint;

const imagekit = new ImageKit(imagekitConfigOptions);

export const uploadFile = function(file) {
	return new Promise((resolve, reject) => {
		imagekit.upload({
			file,
			fileName: file.name, //you can change this and generate your own name if required
			tags: ["sample-tag-1", "sample-tag-2"] //change this or remove it if you want
		}, function(err, result) {
			if(err) reject(err);
			resolve(result);
		})
	})
}