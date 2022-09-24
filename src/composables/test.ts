import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

const writeSecretFile = async () => {
    await Filesystem.writeFile({
        path: 'secrets/text.txt',
        data: "This is a test",
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
    });
};

const readSecretFile = async () => {
    const contents = await Filesystem.readFile({
        path: 'secrets/text.txt',
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
    });

    console.log('secrets:', contents);
};

const deleteSecretFile = async () => {
    await Filesystem.deleteFile({
      path: 'secrets/text.txt',
      directory: Directory.Documents,
    });
  };

export { readSecretFile, writeSecretFile, deleteSecretFile }