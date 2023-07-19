export default function formatDate(dateString) {
    const date = new Date(dateString);
  
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
  
    return formattedDate;
  }