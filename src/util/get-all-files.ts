import fs from 'fs';
import p from 'path';

type FileData = {
	filePath: string;
	fileContents: any;
};

function getAllFiles(path: string, foldersOnly = false) {
	const files = fs.readdirSync(path, {
		withFileTypes: true,
	});
	const filesFound: FileData[] = [];

	for (const file of files) {
		const filePath = p.join(path, file.name);

		if (file.isDirectory()) {
			if (foldersOnly) {
				filesFound.push({
					filePath,
					fileContents: file,
				});
			} else {
				filesFound.push(...getAllFiles(filePath));
			}
			continue;
		}

		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const fileContents = require(filePath);
		filesFound.push({
			filePath,
			fileContents: fileContents?.default || fileContents,
		});
	}

	return filesFound;
}

export default getAllFiles;
