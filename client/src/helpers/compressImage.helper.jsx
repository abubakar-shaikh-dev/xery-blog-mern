const compressImage = (base64Image, maxWidth, maxHeight, quality) => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }

      if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          const reader = new FileReader();

          reader.onloadend = () => {
            const compressedImage = reader.result;
            resolve(compressedImage);
          };

          reader.readAsDataURL(blob);
        },
        'image/jpeg',
        quality / 100
      );
    };

    img.onerror = () => {
      reject(new Error('Failed to load the image.'));
    };

    img.src = base64Image;
  });
};

export default compressImage;
