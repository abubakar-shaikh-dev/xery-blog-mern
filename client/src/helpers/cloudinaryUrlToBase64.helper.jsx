import axios from 'axios';

async function cloudinaryUrlToBase64(imageUrl) {
  try {
    const response = await axios.get(imageUrl, {
      responseType: 'blob',
    });
    const base64 = await convertBlobToBase64(response.data);
    return base64;
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
}

function convertBlobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export default cloudinaryUrlToBase64;
