document.getElementById('problemImage').addEventListener('change', function(e) {
    const fileName = e.target.files[0] ? e.target.files[0].name : 'No file selected';
    document.getElementById('file-name').textContent = fileName;
});

document.getElementById('problemType').addEventListener('change', function(e) {
    const otherGroup = document.getElementById('otherFieldGroup');
    if (e.target.value === 'Other') {
        otherGroup.style.display = 'block';
    } else {
        otherGroup.style.display = 'none';
    }
});

document.getElementById('reportForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const region = document.getElementById('region').value.trim();
    const problemType = document.getElementById('problemType').value;
    const otherReason = document.getElementById('otherReason').value.trim();
    const problemDetails = document.getElementById('problemDetails').value.trim();
    const mapLink = document.getElementById('mapLink').value.trim();
    const imageInput = document.getElementById('problemImage');

    if (!fullName || !region || !problemType || !problemDetails) {
        alert('Please fill in all required fields.');
        return;
    }

    const saveProblemToStorage = (imageData = '') => {
        const problems = JSON.parse(localStorage.getItem('problems')) || [];
        
        const newProblem = {
            id: Date.now(),
            name: fullName,
            area: region,
            type: problemType === 'Other' ? (otherReason || 'Other') : problemType,
            details: problemDetails,
            map: mapLink,
            image: imageData
        };

        problems.push(newProblem);
        localStorage.setItem('problems', JSON.stringify(problems));

        // Show toast
        const toast = document.getElementById('toastMsg');
        toast.style.display = 'block';
        
        setTimeout(() => {
            toast.style.display = 'none';
            window.location.href = 'problem.html'; // الانتقال لصفحة الإشعارات فوراً
        }, 1500);
    };

    // قراءة الصورة وتحويلها إلى Base64 لعرضها في صفحة الإشعارات
    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(uploadEvent) {
            saveProblemToStorage(uploadEvent.target.result);
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        saveProblemToStorage('');
    }
});