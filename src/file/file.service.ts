import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

export enum FileType {
	AUDIO = 'audio',
	IMAGE = 'image',
}

@Injectable()
export class FileService {
	createFile(type: FileType, file): string {
		try {
			const fileExtension = type == FileType.AUDIO ? 'mp3' : 'jpg';
			// const fileExtension = file.originalname.split('.').pop();
			const fileName = uuid.v4() + '.' + fileExtension;
			const filePath = path.resolve(__dirname, '..', 'static', type);
			if (!fs.existsSync(filePath)) {
				fs.mkdirSync(filePath, { recursive: true });
			}
			fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
			return type + '/' + fileName;
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	createCover(type: FileType, file): string {
		try {
			const fileExtension = file.format.split('/').pop();
			const fileName = uuid.v4() + '.' + fileExtension;
			const filePath = path.resolve(__dirname, '..', 'static', type);
			if (!fs.existsSync(filePath)) {
				fs.mkdirSync(filePath, { recursive: true });
			}
			fs.writeFileSync(path.resolve(filePath, fileName), file.data);
			return type + '/' + fileName;
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	createFileInit(file): string {
		try {
			console.log(file);

			const fileExtension = 'mp3';
			const fileName = uuid.v4() + '.' + fileExtension;
			const filePath = path.resolve(__dirname, '..', 'static', 'audio');
			if (!fs.existsSync(filePath)) {
				fs.mkdirSync(filePath, { recursive: true });
			}
			fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
			return 'audio/' + fileName;
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// pushInitTracks(albumId) {
	// 	const folderPathMain = path.resolve('C:\\MAIN__FILES\\FOR_WEB\\spotic_server\\src\\InitTracks\\');

	// 	fs.readdirSync(folderPathMain).forEach((folder) => {
	// 		let fileList = fs.readdirSync(path.resolve(folderPathMain, folder));
	// 		fileList = fileList.map((file) => path.resolve(folderPathMain, folder, file));

	// 		fileList.forEach((filePath) => {
	// 			const file = fs.readFile(filePath, (err, data) => {
	// 				const fileInstance = {
	// 					audio: [
	// 						{
	// 							buffer: data,
	// 							size: data.byteLength,
	// 						},
	// 					],
	// 				};

	// 				// this.createFileInit(fileInstance.audio[0]);
	// 				this.createFile(FileType.AUDIO, fileInstance.audio[0]);
	// 			});
	// 			console.log(file);
	// 		});
	// 	});
	// }

	removeAllFile() {
		console.log(path.resolve(__dirname, 'audio'));

		fs.rm(path.resolve(__dirname, 'audio'), () => {
			console.log('remove all files done');
		});
	}
}
