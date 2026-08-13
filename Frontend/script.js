function setSample(text) {
    document.getElementById('questionInput').value = text;
}

document.getElementById('classifyForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const question = document.getElementById('questionInput').value.trim();
    if (!question) return;

    const btn = document.getElementById('submitBtn');
    const resultCard = document.getElementById('resultCard');
    
    btn.disabled = true;
    btn.innerHTML = '<span>Classifying...</span>';

    try {
        const response = await fetch('/api/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question: question })
        });
        const data = await response.json();

        document.getElementById('categoryText').textContent = data.predicted_category || 'Unknown';
        document.getElementById('questionText').textContent = '"' + data.question + '"';
        if (data.confidence) {
            document.getElementById('confidenceText').textContent = data.confidence + ' Confidence';
        }
        resultCard.style.display = 'block';
    } catch (err) {
        alert('Error reaching prediction API: ' + err);
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<span>Classify Question</span>';
    }
});
