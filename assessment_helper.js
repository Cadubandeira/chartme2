function translateResultInterpretation(resultInterpretation) {
    switch (resultInterpretation) {
       case 'excellent':
          return  'Excelente';
           break;
        case 'good':
          return  'Bom';
           break;
        case 'average':
          return  'Oportunidades de Melhoria';
           break;
        case 'bad':
         return   'Necessário Investir Intensamente';
          break;
         default:
          return  'Não Disponível';
}
}
async function loadAssessmentDetails(assessmentId) {
    try {
         showLoading();
         loadingMessage.innerText = "Loading Assessment Details...";
        const docRef = firebase.firestore().collection("assessmentHistory").doc(assessmentId);
        const doc = await docRef.get();

        if (doc.exists) {
             hideLoading();
            const assessment = doc.data();
           return assessment; // Return assessment data for PDF generation

        } else {
            document.getElementById('section-results').innerText = 'Assessment not found.';
        }
    } catch (error) {
        console.error("Error loading assessment details:", error);
        document.getElementById('section-results').innerText = 'Error loading assessment details.';
    } finally {
        hideLoading();
    }
 return null;
}
async function shareOnWhatsApp(assessment) {
const message = `Olá! Acabei de fazer um teste de Inner Networking incrível e olha só o resultado:  IMP - Índice de Magnetismo Pessoal. \n\n ${assessment.result} pontos \n ${translateResultInterpretation(assessment.resultInterpretation)}. \n\n Veja meus resultados completos em ${window.location.href}.`;
const encodedMessage = encodeURIComponent(message);


try {
const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
window.open(whatsappUrl, '_blank');
} catch (error) {
console.error("Error sharing:", error);
alert("Error sharing. Please try again.");  // Optional user message
}
}
// Make these functions globally accessible
window.showLoading = showLoading;
window.hideLoading = hideLoading;
window.loadingMessage = loadingMessage;
