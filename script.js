const myImage = new Image(100, 200);
myImage.src = "cat.png";
function uploadPhoto() {
    const fileInput = document.getElementById('fileInput');
    const preview = document.getElementById('preview');
    
    const file = fileInput.files[0];

    if (file) {
        // Display a preview of the selected image
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            preview.innerHTML = '';
            preview.appendChild(myImage);
        };
        reader.readAsDataURL(file);

        // Create a FormData object to send the file to the server
        const formData = new FormData();
        formData.append('photo', file);

        // Use fetch to send the file to the server (you need to implement the server-side logic)
        fetch('/upload', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log('Server response:', data);
            // You can handle the server response here
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert('Please select a photo to upload.');
    }
}