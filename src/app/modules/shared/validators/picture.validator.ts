export class PictureValidator {

    // TODO: a déplacer dans un fichier de config général
    public static VALID_PICTURE_EXTENSION = ['jpeg', 'png', 'jpg'];
  
    static extension(file): any {
      if (file.pristine) {
        return null;
      }
  
      file.markAsTouched();
  
      // Extension
      let extension = null;
      if (file) {
        const split = file.value.split('.');
        extension = split[1];
  
        if (extension === 'jpeg') {
          extension = 'jpg';
        }
  
        if (PictureValidator.VALID_PICTURE_EXTENSION.indexOf(extension.toLowerCase()) === -1) {
          return {
            invalidExtension: true,
          };
        }
      }
      return null;
    }
  }
  