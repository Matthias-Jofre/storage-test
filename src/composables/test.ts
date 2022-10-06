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
        directory: Directory.Data,
        encoding: Encoding.UTF8,
    });

    console.log('secrets:', contents);
    console.log('secrets:', JSON.parse(contents.data));
    const asd = JSON.parse(contents.data)
    const asdd = asd.nombre
    console.log('Ahora puedo mandar mensajes personalizados xd', asd.nombre);
    return {
        asdd
    }
};

const deleteSecretFile = async () => {
    await Filesystem.deleteFile({
        path: 'secrets/text.txt',
        directory: Directory.Documents,
    });
};

export { readSecretFile, writeSecretFile, deleteSecretFile }